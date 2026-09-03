# Multi-stage production Dockerfile for Render and Cloud Platforms
FROM node:20-slim AS base
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Step 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Install build tools for native dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

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
ENV DATABASE_URL="postgresql://neondb_owner:npg_WLX1dmBZcq6H@ep-patient-dawn-ayhhz3tw-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Generate Prisma Client and build application
RUN cd web && npx prisma generate && npm run build

# Step 3: Production runner image
FROM base AS runner
WORKDIR /app/web

ENV NODE_ENV=production
ENV PORT=10000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="postgresql://neondb_owner:npg_WLX1dmBZcq6H@ep-patient-dawn-ayhhz3tw-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
ENV NEXT_PUBLIC_APP_URL="https://business-in.onrender.com"
ENV BETTER_AUTH_SECRET="business-in-secure-secret-key-32-chars-long-2026"
ENV BETTER_AUTH_URL="https://business-in.onrender.com"


RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 -g nodejs -m nextjs

# Copy built artifacts and dependencies
COPY --from=builder /app/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/web/node_modules ./node_modules
COPY --from=builder /app/web/package.json ./package.json

USER nextjs

EXPOSE 10000

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "10000"]

