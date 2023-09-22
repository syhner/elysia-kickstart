import type { Config } from 'drizzle-kit';
import { env } from '~/env';

export default {
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;
