import { component, forLoop, type VComponent } from '@tinaf/core/component';
import { div } from '@tinaf/core/dom';
import { Header } from './Header';
import { reactiveList } from '@tinaf/core/reactive';

import { GroceryItemInput } from './GroceryItemInput';
import { reactive } from '@tinaf/core/reactive';

// TODO: this seems to work but the typs are broken
const MainContainer = component(({ children }: { children: VComponent[] }) => {
  return div(...children).addClass('p-8 gap-8 flex flex-col ');
});
export const App: () => VComponent = component(() => {
  const items = reactiveList<string>([]);

  const addItem = (newItem: string) => items.add(newItem);

  return div(
    Header(),
    MainContainer({
      children: [
        GroceryItemInput({
          onAddItem: addItem,
        }),

        div(forLoop(items, (item) => div(item))).addClass(
          'flex flex-col gap-4'
        ),
      ],
    })
  ).addClass('flex flex-col w-screen h-screen text-slate-800');
});
