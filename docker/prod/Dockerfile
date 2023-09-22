# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0
FROM oven/bun:${BUN_VERSION} AS base
RUN apt-get update -qq && \
  apt-get install -y build-essential pkg-config python-is-python3

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY bun.lockb package.json ./
RUN bun install --ci

# Build public/ files (i.e. tailwind output)
FROM deps as build
COPY bun.lockb package.json tailwind.config.ts ./
COPY public/ ./public/
COPY src/ ./src/
RUN bun install
RUN bun run build

# Development image, copy all the files and run the server
FROM base AS run
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 elysiajs
USER elysiajs
# Copy files
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=build /app/public/ ./public/
COPY src/ ./src/
COPY package.json tailwind.config.ts tsconfig.json ./
# Set environment variables
ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
CMD ["bun", "src/index.ts"]
