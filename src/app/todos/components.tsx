import { Todo } from '~/db/schemas/todo';

export function TodoItem({ todo, enabled }: { todo: Todo; enabled: boolean }) {
  return (
    <div class='flex flex-row space-x-3'>
      <input
        name='completed'
        type='checkbox'
        checked={todo.completed}
        hx-patch={`/todos/${todo.id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
        disabled={!enabled}
      />
      <p>{todo.task}</p>
      <button
        class='text-red-500'
        hx-delete={`/todos/${todo.id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
        disabled={!enabled}
      >
        X
      </button>
    </div>
  );
}

export function TodoList({
  todos,
  enabled,
}: {
  todos: Todo[];
  enabled: boolean;
}) {
  return (
    <div id='todo-list'>
      {todos.toReversed().map((todo) => (
        <TodoItem todo={todo} enabled={enabled} />
      ))}
    </div>
  );
}

export function TodoForm({ enabled }: { enabled: boolean }) {
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
        disabled={!enabled}
      >
        Add
      </button>
    </form>
  );
}
