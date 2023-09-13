import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { t } from 'elysia';

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  task: text('task').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
});

export const todoSchema = createSelectSchema(todos);
export const insertTodoSchema = createInsertSchema(todos, {
  task: t.Union([
    t.Literal('Go shopping'),
    t.Literal('Buy bread'),
    t.Literal('Make dinner'),
  ]),
});
const prePatchTodoSchema = createInsertSchema(todos, {
  completed: t.Optional(t.Literal('on')),
});
export const patchTodoSchema = t.Partial(prePatchTodoSchema);

export type Todo = typeof todoSchema.static;
export type InsertTodoSchema = typeof insertTodoSchema.static;
export type PatchTodoSchema = typeof patchTodoSchema.static;
