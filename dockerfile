# ---------- deps ----------
FROM node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
# если используешь npm — оставляем npm ci
RUN npm ci

# ---------- builder ----------
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production

# ВАЖНО: публичные env должны быть известны на этапе билда,
# чтобы Next встроил их в клиентский бандл:
ARG NEXT_PUBLIC_TONCONNECT_MANIFEST_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_ADMIN_WALLETS
ARG NEXT_PUBLIC_CONTRACT_ADDRESS

ENV NEXT_PUBLIC_TONCONNECT_MANIFEST_URL=$NEXT_PUBLIC_TONCONNECT_MANIFEST_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_ADMIN_WALLETS=$NEXT_PUBLIC_ADMIN_WALLETS
ENV NEXT_PUBLIC_CONTRACT_ADDRESS=$NEXT_PUBLIC_CONTRACT_ADDRESS

RUN npx next telemetry disable && npm run build

# ---------- runner ----------
FROM node:22-slim AS runner
WORKDIR /app

# используем уже встроенного пользователя node вместо кастомного
# (меньше хлопот с правами)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# даём Next право писать кэш, чтобы не было EACCES
RUN mkdir -p /app/.next/cache/images && chown -R node:node /app
USER node

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]

