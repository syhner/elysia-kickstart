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

export const TodoItem = (todo: Todo) => {
  return (
    <div class='flex flex-row space-x-3'>
      <input
        name='completed'
        type='checkbox'
        checked={todo.completed}
        hx-patch={`/todos/${todo.id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
      />
      <p>{todo.task}</p>
      <button
        class='text-red-500'
        hx-delete={`/todos/${todo.id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
      >
        X
      </button>
    </div>
  );
};

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div id='todo-list'>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
};

export const TodoForm = () => {
  return (
    <form
      class='flex flex-row space-x-3'
      hx-post='/todos'
      hx-target='#todo-list'
      hx-swap='afterend'
    >
      <select name='task' class='border border-black dark:text-black'>
        <option value='' disabled='true' selected='true'>
          Select a Todo
        </option>
        <option value='Go shopping'>Go shopping</option>
        <option value='Buy bread'>Buy bread</option>
        <option value='Make dinner'>Make dinner</option>
      </select>
      <button type='submit'>Add</button>
    </form>
  );
};
