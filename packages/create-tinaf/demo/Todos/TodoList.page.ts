import { component, forLoop } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { inputReactive, reactiveList } from 'tinaf/reactive';
import { Todo } from './components/Todo';
import { Input } from '../shared/Input';

export const TodoListPage = component(() => {
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
      <Input reactiveInput={todoInput} placeholder="Add todo" />

      <button @click={() => addTodo(todoInput.value)} className="rounded-full flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 h-8 w-8 text-white text-lg">+</button>
    </div>
  </div>
});


/**
 *     // div(
    //   forLoop(
    //     todos,
    //     (todo) => Todo({ todo, onRemoveTodo: () => removeTodo(todo) }),
    //     (todo) => todo // key function
    //   )
    // ).addClass('flex flex-col gap-1')

 */