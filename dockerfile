# syntax=docker/dockerfile:1.7

############################
# 1) DEPS (кэшируем npm ci)
############################
FROM node:22-slim AS deps
WORKDIR /app

# Для reproducible install и быстрых повторных сборок
ENV NODE_ENV=development
COPY package*.json ./
# Кэш npm чтобы не тянуть пакеты каждый раз
RUN --mount=type=cache,target=/root/.npm npm ci

############################
# 2) BUILD (Next prod build)
############################
FROM node:22-slim AS builder
WORKDIR /app

# Публичные переменные прокидываем на этапе билда,
# чтобы Next встроил их в клиентский бандл
ARG NEXT_PUBLIC_TONCONNECT_MANIFEST_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_ADMIN_WALLETS
ARG NEXT_PUBLIC_CONTRACT_ADDRESS

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_TONCONNECT_MANIFEST_URL=${NEXT_PUBLIC_TONCONNECT_MANIFEST_URL} \
    NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL} \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY} \
    NEXT_PUBLIC_ADMIN_WALLETS=${NEXT_PUBLIC_ADMIN_WALLETS} \
    NEXT_PUBLIC_CONTRACT_ADDRESS=${NEXT_PUBLIC_CONTRACT_ADDRESS}

# Берём готовые node_modules из deps-стадии и докидываем исходники
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Прод-сборка (включает .next/standalone)
RUN npm run build

############################
# 3) RUNTIME (минимум, non-root)
############################
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Копируем только то, что нужно рантайму
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Права и непривилегированный пользователь (встроенный 'node')
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["node", "server.js"]
