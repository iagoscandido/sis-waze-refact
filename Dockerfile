# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Criar diretório de app
WORKDIR /app

# Copiar apenas arquivos de dependências para otimizar cache
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Escolha do gerenciador de pacotes (pnpm > yarn > npm)
# Se estiver usando PNPM:
RUN npm install -g pnpm && pnpm install --frozen-lockfile
# Se estiver usando NPM:
# RUN npm ci

# Copiar todo o código
COPY . .

# Build do projeto com turbopack
RUN pnpm run build
# ou se usar npm
# RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar arquivos essenciais do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Iniciar o Next.js em modo produção
CMD ["pnpm", "start"]
# Se usar npm:
# CMD ["npm", "start"]
