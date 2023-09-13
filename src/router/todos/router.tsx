import { eq } from 'drizzle-orm';
import Elysia from 'elysia';
import { insertTodoSchema, patchTodoSchema, todos } from '~/db/schemas/todo';
import { db, idParamsSchema } from '~/lib/db';
import { TodoForm, TodoItem, TodoList } from './components';

export const router = new Elysia({ prefix: '/todos' })
  .get('/', () => {
    const allTodos = db.select().from(todos).all();
    return (
      <div class='flex flex-col p-6'>
        <TodoForm />
        <TodoList todos={allTodos} />
      </div>
    );
  })
  .post(
    '/',
    (ctx) => {
      const newTodo = db.insert(todos).values(ctx.body).returning().get();
      return <TodoItem {...newTodo} />;
    },
    { body: insertTodoSchema }
  )
  .patch(
    '/:id',
    (ctx) => {
      const patchedTodo = db
        .update(todos)
        .set({ completed: ctx.body.completed === 'on' })
        .where(eq(todos.id, ctx.params.id))
        .returning()
        .get();
      return <TodoItem {...patchedTodo} />;
    },
    { body: patchTodoSchema, params: idParamsSchema }
  )
  .delete(
    '/:id',
    (ctx) => {
      db.delete(todos).where(eq(todos.id, ctx.params.id)).run();
    },
    { params: idParamsSchema }
  );
