import { eq } from 'drizzle-orm';
import Elysia from 'elysia';
import { insertTodoSchema, patchTodoSchema, todos } from '~/db/schemas/todo';
import { isAuthenticated } from '~/hooks/isAuthenticated';
import { getSession } from '~/lib/auth';
import { db, idParamsSchema } from '~/lib/db';
import { TodoForm, TodoItem, TodoList } from './components';

export const router = new Elysia({ prefix: '/todos' })
  .get('/', async (ctx) => {
    const session = await getSession(ctx.request);

    const allTodos = await db.select().from(todos).all();
    return (
      <div class='flex flex-col'>
        <TodoForm disabled={!session} />
        <TodoList todos={allTodos} />
      </div>
    );
  })
  .post(
    '/',
    async (ctx) => {
      const newTodo = await db.insert(todos).values(ctx.body).returning().get();
      return <TodoItem {...newTodo} />;
    },
    {
      body: insertTodoSchema,
      beforeHandle: [isAuthenticated],
    }
  )
  .patch(
    '/:id',
    async (ctx) => {
      const patchedTodo = await db
        .update(todos)
        .set({ completed: ctx.body.completed === 'on' })
        .where(eq(todos.id, ctx.params.id))
        .returning()
        .get();
      return <TodoItem {...patchedTodo} />;
    },
    {
      body: patchTodoSchema,
      params: idParamsSchema,
      beforeHandle: [isAuthenticated],
    }
  )
  .delete(
    '/:id',
    async (ctx) => {
      await db.delete(todos).where(eq(todos.id, ctx.params.id)).run();
    },
    {
      params: idParamsSchema,
      beforeHandle: [isAuthenticated],
    }
  );
