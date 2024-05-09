import { component } from 'tinaf/component';
import { button, div, input } from 'tinaf/dom';
import { inputReactive } from 'tinaf/reactive';

type OnAddItem = (item: string) => void;

export const GroceryItemInput = component<{ onAddItem: OnAddItem }>(
  ({ onAddItem }) => {
    const i = inputReactive<string>('');

    return div(
      input(i, {
        placeholder: 'Add a grocery item',
      }).addClass('border flex w-full border-primary p-2'),

      button('Add item')
        .on({
          click: () => {
            onAddItem(i.value);
            i.update('');
          },
        })
        .addClass(
          'border hover:bg-slate-100 border-slate-800 text-slate-800  w-32 rounded-sm p-2'
        )
    ).addClass('flex gap-4');
  }
);
