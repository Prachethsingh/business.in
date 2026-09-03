# Multi-stage production Dockerfile for Render and Cloud Platforms
FROM node:20-slim AS base

# Step 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Install openssl and build tools for native dependencies
RUN apt-get update && apt-get install -y openssl python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy root and web package files
COPY package.json package-lock.json* ./
COPY web/package.json web/package-lock.json* ./web/
RUN cd web && npm install

# Step 2: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate Prisma Client and build application
RUN cd web && npx prisma generate && npm run build

# Step 3: Production runner image
FROM base AS runner
WORKDIR /app/web

ENV NODE_ENV=production
ENV PORT=10000
ENV HOSTNAME="0.0.0.0"

# Install openssl in runner for Prisma runtime
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 -g nodejs nextjs

# Copy built artifacts and dependencies
COPY --from=builder /app/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/web/node_modules ./node_modules
COPY --from=builder /app/web/package.json ./package.json

USER nextjs

EXPOSE 10000

CMD ["npx", "next", "start", "-p", "10000"]
