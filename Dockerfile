# Multi-stage production Dockerfile for Render and Cloud Platforms
FROM node:20-alpine AS base

# Step 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built artifacts and dependencies
COPY --from=builder /app/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/web/node_modules ./node_modules
COPY --from=builder /app/web/package.json ./package.json

USER nextjs

EXPOSE 10000

CMD ["npx", "next", "start", "-p", "10000"]
