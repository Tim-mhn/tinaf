import { component } from 'tinaf/component';
import { button, div } from 'tinaf/dom';

const RemoveTodoButton = component<{ onRemoveTodo: () => void }>(
  ({ onRemoveTodo }) => {
    return button('X')
      .addClass(
        'bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center'
      )
      .on({ click: onRemoveTodo });
  }
);
export const Todo = component<{ todo: string; onRemoveTodo: () => void }>(
  ({ todo, onRemoveTodo }) => {
    return div(div(todo), RemoveTodoButton({ onRemoveTodo })).addClass(
      'flex items-center gap-4 text-sm '
    );
  }
);
