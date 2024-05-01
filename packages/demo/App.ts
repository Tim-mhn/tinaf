import { button, div, span } from '@tinaf/core/dom';
import {
  bool,
  computed,
  inputReactive,
  not,
  reactive,
} from '@tinaf/core/reactive';
import { VDivExample } from './components/VDivExample';
import { vcomponent } from '@tinaf/core/component';
import { input } from '@tinaf/core/dom';
import { when } from '@tinaf/core/component';
import { forLoop } from '@tinaf/core/component';

const ToggleClasses = vcomponent(() => {
  const [active, toggleActive] = bool(true);

  const bgClass = computed(
    () => (active.value ? 'bg-green-500' : 'bg-slate-500'),
    [active]
  );

  return div(
    button('Toggle class').on({
      click: toggleActive,
    }),
    div('Look at my background').addClass([
      bgClass,
      'border-red-800 border-4 p-1 rounded-sm',
    ])
  ).addClass('flex gap-4');
});

type Todo = { title: string; id: string };

const createTodo = (title: string) => ({
  title,
  id: crypto.randomUUID(),
});
const RenderForLoopV2Example = vcomponent(() => {
  const todos = reactive([
    createTodo('Hello'),
    createTodo('Foo'),
    createTodo('Bar'),
  ]);

  const addTodo = (todo: string) =>
    todos.update([...todos.value, createTodo(todo)]);

  const removeTodo = (todo: Todo) =>
    todos.update([...todos.value].filter((t) => t.id !== todo.id));

  const insertTodo = () =>
    todos.update([todos.value[0], createTodo('bazz'), ...todos.value.slice(1)]);

  return div(
    div(
      button('Add todo').on({
        click: () => addTodo('test'),
      }),
      button('remove last todo').on({
        click: () => removeTodo(todos.value[todos.value.length - 1]),
      }),
      button('insert todo').on({
        click: insertTodo,
      })
    ).addClass('flex gap-8 border-b'),
    div(
      forLoop(todos, (todo) =>
        div(
          div(todo.title).addClass('bg-blue-300 text-blue-800'),
          button('X').on({
            click: () => removeTodo(todo),
          })
        ).addClass('flex w-fit p-2 gap-2 border border-slate-300')
      )
    ).addClass('flex flex-col ')
  ).addClass('flex flex-col gap-4');
});

const ShowWhen = vcomponent(() => {
  const [visible, toggleVisible] = bool(true);

  const toggleVisibleButton = button('toggle visibility')
    .on({
      click: toggleVisible,
    })
    .addClass('border border-blue-300 p-1 rounded-sm hover:bg-blue-100');

  return div(
    span(visible),
    when(visible).render(div('visible')),
    when(visible).render(div('visible')).else(div('invisible')),
    toggleVisibleButton
  ).addClass('flex flex-row gap-4 border border-blue-300 p-1');
});

const Header = vcomponent(() => {
  const title = reactive('Header');

  // setInterval(() => title.update('Header @' + Date.now()), 2000);
  return div(title).addClass('flex flex-col gap-16 border border-blue-300');
});

const NestedStateChild = vcomponent(() => {
  const count = reactive(0);
  const increment = () => count.update(count.value + 1);

  return div(count, button('increment child counter').on({ click: increment }));
});
const NestedStateExample = vcomponent(() => {
  const count = reactive(0);

  const increment = () => count.update(count.value + 1);

  return div(
    count,
    button('increment parent counter').on({ click: increment }),
    NestedStateChild
  ).addClass('border border-slate-300 p-4 rounded-sm');
});

const InputExample = vcomponent(() => {
  const text = inputReactive<string>('initial text');

  return div(
    span('TODO: make inputs work properly').addClass(
      'text-red-700 font-semibold'
    ),
    span('DONE ✓✓✓'),
    input(text).addClass('border p-1 border-slate-800 rounded-sm'),
    span(text)
  ).addClass('flex flex-col gap-2 border-2 border-blue-600 p-2 rounded-md');
});

const SimpleForLoop = vcomponent(() => {
  const items = reactive(['Hello', 'World', 'Foo', 'Bar']);

  const addItem = () => items.update([...items.value, 'new item']);
  return div(
    button('Add item').on({ click: addItem }),
    forLoop(items, (item) => div(item))
  ).addClass('flex flex-col gap-4');
});

export const App = vcomponent(() => {
  const hello = reactive('hello');
  const world = reactive('world');

  const [active, toggleActive] = bool(true);

  setTimeout(() => world.update('world 2'), 2000);
  return div(
    Header,
    ToggleClasses,
    world, // NB: this does not work
    InputExample,

    ShowWhen,

    RenderForLoopV2Example,
    NestedStateExample,
    VDivExample,
    div('TODO: make the if/else work').addClass(
      'text-lg text-slate-100 font-bold p-2 bg-red-800 rounded-sm justify-center flex'
    ),
    div('DONE ✓✓✓').addClass(
      'bg-green-600 text-white text-lg flex justify-center p-2'
    ),
    SimpleForLoop
  ).addClass('flex flex-col  gap-4 p-4');
});
