import { z } from 'zod';

/**
 * Toggle environment variables
 * 'true' or '1' will evaluate to true
 * 'false' or '0' will evaluate to false
 */
const toggle = z
  .enum(['true', 'false', '0', '1'])
  .transform((v) => v === 'true' || v === '1');

const envVariables = z.object({
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  DB_AUTH_TOKEN: z.string().min(1),
  DB_URL: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  RUNTIME: z.enum(['bun', 'edge']).default('bun'),
});

export const env = envVariables.parse(process.env);
