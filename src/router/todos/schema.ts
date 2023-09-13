import { t } from 'elysia';

export const todoSchema = t.Object({
  id: t.Numeric(),
  task: t.Union([
    t.Literal('Go shopping'),
    t.Literal('Buy bread'),
    t.Literal('Make dinner'),
  ]),
  completed: t.Boolean(),
});

export type Todo = typeof todoSchema.static;
