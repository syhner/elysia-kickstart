import { Todo } from '~/db/schemas/todo';

export function TodoItem(todo: Todo) {
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
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div id='todo-list'>
      {todos.toReversed().map((todo) => (
        <TodoItem {...todo} />
      ))}
    </div>
  );
}

export function TodoForm({ disabled }: { disabled: boolean }) {
  return (
    <form
      class='flex flex-row space-x-3'
      hx-post='/todos'
      hx-target='#todo-list'
      hx-swap='afterbegin'
    >
      <select
        name='task'
        class='rounded-sm border border-black dark:text-black'
      >
        <option value='Go shopping' selected='true'>
          Go shopping
        </option>
        <option value='Buy bread'>Buy bread</option>
        <option value='Make dinner'>Make dinner</option>
      </select>
      <button
        type='submit'
        class='disabled:opacity-50 disabled:pointer-events-none rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3'
        // @ts-expect-error `disabled` is incorrectly typed as a string
        disabled={disabled}
      >
        Add
      </button>
    </form>
  );
}
