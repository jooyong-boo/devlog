# 빌드 스테이지
FROM node:18-alpine AS base

# 환경 변수 설정
ARG URL
ARG OAUTH_GITHUB_ID
ARG OAUTH_GITHUB_SECRET
ARG GOOGLE_ID
ARG GOOGLE_SECRET
ARG AUTH_SECRET
ARG AUTH_URL
ARG DATABASE_URL

ENV URL=$URL
ENV OAUTH_GITHUB_ID=$OAUTH_GITHUB_ID
ENV OAUTH_GITHUB_SECRET=$OAUTH_GITHUB_SECRET
ENV GOOGLE_ID=$GOOGLE_ID
ENV GOOGLE_SECRET=$GOOGLE_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_URL=$AUTH_URL
ENV DATABASE_URL=$DATABASE_URL


FROM base AS deps

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma
COPY . .

RUN pnpm install

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

RUN npx prisma generate

RUN npm run build


# 프로덕션 스테이지
FROM base AS production
WORKDIR /app

# 빌드된 애플리케이션 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["pnpm", "start:migrate"]