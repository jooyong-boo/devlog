FROM node:18-alpine AS base


# 빌드 시 필요한 인자들
ARG URL
ARG OAUTH_GITHUB_ID
ARG OAUTH_GITHUB_SECRET
ARG GOOGLE_ID
ARG GOOGLE_SECRET
ARG AUTH_SECRET
ARG DATABASE_URL

# 환경 변수 설정
ENV URL=$URL
ENV OAUTH_GITHUB_ID=$OAUTH_GITHUB_ID
ENV OAUTH_GITHUB_SECRET=$OAUTH_GITHUB_SECRET
ENV GOOGLE_ID=$GOOGLE_ID
ENV GOOGLE_SECRET=$GOOGLE_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ENV DATABASE_URL=$DATABASE_URL

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

USER root
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

COPY prisma ./prisma
COPY . .

RUN pnpm install

RUN npx prisma generate

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["pnpm", "start"]