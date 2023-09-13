import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  verbose: true,
  strict: true,
} satisfies Config;
