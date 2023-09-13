FROM oven/bun AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

# Development image, copy all the files and run the server
FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 elysiajs
USER elysiajs
# Copy files
COPY --from=deps /app/node_modules/ ./node_modules/
COPY public/ ./public/
COPY src/ ./src/
COPY .env* package.json tailwind.config.ts tsconfig.json ./
# Set environment variables
ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
RUN bun run tw
CMD ["bun", "src/index.tsx"]
