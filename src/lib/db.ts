import { Database } from 'bun:sqlite';
import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { t } from 'elysia';

const sqlite = new Database('sqlite.db');
export const db: BunSQLiteDatabase = drizzle(sqlite, { logger: true });

// Run migration here since drizzle-kit push does not support bun:sqlite
migrate(db, { migrationsFolder: './src/db/migrations' });

// Useful for validating request params
export const idParamsSchema = t.Object({ id: t.Numeric() });
