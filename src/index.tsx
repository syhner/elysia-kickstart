import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia, NotFoundError, t } from 'elysia';
import { api } from './api';
import { Layout } from './components/Layout';
import { Todo, TodoForm, TodoItem, TodoList, todoSchema } from './todos';

const todos: Todo[] = [
  { id: 1, task: 'Go shopping', completed: true },
  { id: 2, task: 'Buy bread', completed: false },
  { id: 3, task: 'Make dinner', completed: false },
];

const app = new Elysia()
  .use(api())
  .use(html())
  .use(staticPlugin())
  .get('/dist/globals.css', () => Bun.file('./dist/globals.css'))
  .get('/', () => (
    <Layout>
      <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
    </Layout>
  ))
  .get('/todos', () => (
    <div class='flex flex-col p-6'>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  ))
  .post(
    '/todos',
    (ctx) => {
      if (!ctx.body.task.length) throw new Error('Task cannot be empty');
      const newTodo: Todo = {
        id: (todos.at(-1)?.id ?? 0) + 1,
        task: ctx.body.task,
        completed: false,
      };

      todos.push(newTodo);
      return <TodoItem {...newTodo} />;
    },
    {
      body: t.Pick(todoSchema, ['task']),
    }
  )
  .patch(
    '/todos/:id',
    (ctx) => {
      const todo = todos.find((todo) => todo.id === ctx.params.id);
      if (!todo) throw new NotFoundError();

      todo.completed = ctx.body.completed === 'on';
      todos.splice(todos.indexOf(todo), 1, todo);

      return <TodoItem {...todo} />;
    },
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Partial(t.Object({ completed: t.String() })),
    }
  )
  .delete(
    '/todos/:id',
    (ctx) => {
      const todo = todos.find((todo) => todo.id === ctx.params.id);
      if (!todo) throw new NotFoundError();

      todos.splice(todos.indexOf(todo), 1);
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  );

app.listen(3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
