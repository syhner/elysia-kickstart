import Elysia, { NotFoundError, t } from 'elysia';
import { TodoForm, TodoItem, TodoList } from './components';
import { Todo, todoSchema } from './schema';

const todos: Todo[] = [
  { id: 1, task: 'Go shopping', completed: true },
  { id: 2, task: 'Buy bread', completed: false },
  { id: 3, task: 'Make dinner', completed: false },
];

export const router = new Elysia({ prefix: '/todos' })
  .get('/', () => (
    <div class='flex flex-col p-6'>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  ))
  .post(
    '/',
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
    '/:id',
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
    '/:id',
    (ctx) => {
      const todo = todos.find((todo) => todo.id === ctx.params.id);
      if (!todo) throw new NotFoundError();

      todos.splice(todos.indexOf(todo), 1);
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  );
