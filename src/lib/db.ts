import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { t } from 'elysia';
import * as authSchemas from '~/db/schemas/auth';
import * as todoSchemas from '~/db/schemas/todo';

const client = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_AUTH_TOKEN,
});
export const db = drizzle(client, {
  logger: true,
  schema: { ...authSchemas, ...todoSchemas },
});

// Useful for validating request params
export const idParamsSchema = t.Object({ id: t.Numeric() });
