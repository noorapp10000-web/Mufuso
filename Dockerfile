# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json tsconfig.base.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/ ./artifacts/api-server/

RUN pnpm install --frozen-lockfile --filter @workspace/api-server...

RUN pnpm --filter @workspace/api-server run build

# ── Stage 2: Runtime (minimal image) ──────────────────────────────────────────
FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/artifacts/api-server/dist ./dist

ENV PORT=7860
ENV NODE_ENV=production

EXPOSE 7860

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
