import { component, For } from 'tinaf/component';
import { inputReactive, reactiveList } from 'tinaf/reactive';
import { Todo } from './components/Todo';
import { Input } from '../shared/Input';
import type { PageComponent} from 'tinaf/router'


export const TodoListPage: PageComponent = component(() => {
  const todos = reactiveList<string>(['Buy milk', 'Do laundry']);

  const todoInput = inputReactive('');

  const addTodo = (newTodo: string) => {
    todos.add(newTodo);
    todoInput.update('');
  };

  const removeTodo = (todoToRemove: string) => {
    const filteredTodos = todos.value.filter((todo) => todo !== todoToRemove);

    todos.update(filteredTodos);
  };

  return <div className="flex flex-col gap-8">
    <div className="flex items-center gap-4">
      <Input reactiveText={todoInput} placeholder="Add todo" />

      <button onClick={() => addTodo(todoInput.value)} className="rounded-full flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 h-6 w-6 text-white text-md">+</button>


      
    </div>

    <ul>

  <For each={todos}>
    { (todo: string) => <li className="flex gap-8 items-center">
      
      <div>{todo}</div>
      <button onClick={() => removeTodo(todo)} className="rounded-full flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 h-6 w-6 text-white text-md">-</button>
      </li> }
  </For>

  </ul>
  </div>
});


