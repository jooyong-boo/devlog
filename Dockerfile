FROM node:18-alpine AS base
# 빌드 시 필요한 인자들
ARG URL
ARG OAUTH_GITHUB_ID
ARG OAUTH_GITHUB_SECRET
ARG GOOGLE_ID
ARG GOOGLE_SECRET
ARG AUTH_SECRET
ARG AUTH_URL
ARG DATABASE_URL
# 환경 변수 설정
ENV URL=$URL
ENV OAUTH_GITHUB_ID=$OAUTH_GITHUB_ID
ENV OAUTH_GITHUB_SECRET=$OAUTH_GITHUB_SECRET
ENV GOOGLE_ID=$GOOGLE_ID
ENV GOOGLE_SECRET=$GOOGLE_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_URL=$AUTH_URL
ENV DATABASE_URL=$DATABASE_URL

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile



FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY . .

ENV NODE_ENV=production

RUN npm install -g pnpm
RUN npx prisma generate
RUN npx prisma db seed

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --chown=nextjs:nodejs prisma ./prisma/        
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

COPY --chown=nextjs:nodejs start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]