# Etapa 1: Dependências
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar apenas os arquivos de lock e manifest
COPY package.json pnpm-lock.yaml ./

# Instalar dependências (somente prod + build deps)
RUN pnpm install --frozen-lockfile

# Etapa 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Etapa 3: Runtime
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar apenas o necessário para rodar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.* ./ 

EXPOSE 3000
CMD ["pnpm", "start"]
