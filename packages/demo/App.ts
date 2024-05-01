import { component, componentWithProps } from '../core/src/component/component';
import { button, div, span } from '../core/src/dom/dom';
import {
  bool,
  computed,
  inputReactive,
  not,
  reactive,
} from '../core/src/reactive';
import { show } from '../core/src/component/show';
import { forLoopRender } from '../core/src/component/for-loop';
import { ForLoopV2ComplexExample } from './components/ForLoopExample';
import { ParentWithReactiveChild } from './components/NestedReativeComponent';
import { VDivExample } from './components/VDivExample';
import { vcomponent } from '../core/src/component/wip/v-component.v2';
import { input } from '../core/src/dom/input';
import { when } from '../core/src/component/wip/conditional-render';
import { forLoop } from '../core/src/component/wip/for-loop';

const Counter = vcomponent(() => {
  const count = reactive(0);

  return div(
    div(count),
    button('Increment').on({ click: () => count.update(count.value + 1) })
  ).addClass('flex border border-slate-300 gap-4');
});

const ConditionalCounter = vcomponent(() => {
  const [visible, toggleVisible] = bool(true);

  return div(
    // show(div('visible')).when(visible),
    show(Counter).when(visible),
    button('Show/hide counter')
      .on({ click: toggleVisible })
      .addClass('border p-1 bg-slate-100'),
    span(visible)
  ).addClass('flex border border-slate-300 gap-4');
});
const ShowWhenElse = vcomponent(() => {
  const [visible, toggleVisible] = bool(true);
  // setInterval(() => toggleVisible(), 2000);
  return div(show(div('visible')).when(visible).else(div('invisible')));
});

const AddStylesReactiveExample = vcomponent(() => {
  const [isBlue, toggleTextColor] = bool(true);

  const textColor = computed(() => (isBlue.value ? 'blue' : 'black'), [isBlue]);

  return div(
    div('This text may be blue or black').addStyles({
      text: '20px',
      color: textColor,
    }),
    button('Toggle text color').on({
      click: toggleTextColor,
    })
  ).addClass('flex gap-4');
});
const AddStylesSimpleExample = div('hello I have custom style').addStyles({
  background: 'red',
  text: '20px',
  color: 'white',
});

/**
 *
 * Dynamic conditional classes
 *
 *
 * boolean reactive
 *
 * const condition = reactive(true);
 *
 * const opposite = condition.opposite() ; // computed(() => !condition.value, [condition])
 *
 * const myDiv = div().addClass({
 *    'bg-primary text-primary': condition,
 *    'bg-seocndary text-secondary' :!condition
 * })
 *
 */

// const DynamicConditionalClassesExample = vcomponentWithProps<{
//   active: boolean;
// }>(({ active }) => {
//   return div('Example of dynamic conditional classes').addClass({
//     'bg-green-300 text-green-600': active,
//     'bg-red-300 text-red-800': not(active),
//   });
// });

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

const Button = vcomponent(() => {
  return button('Click');
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
    // ShowWhen,
    // hello,
    // world,
    // Button,
    // AddStylesSimpleExample,
    // AddStylesReactiveExample,
    // DynamicConditionalClassesExample({ active }),
    // button('Toggle active to toggle classes').on({
    //   click: toggleActive,
    // }),
    // ConditionalCounter,
    // Card({
    //   title: hello,
    //   subtitle: world,
    //   content: div('This is custom content'),
    //   onAdd: () => console.log('added !'),
    // }),
    // ForLoopV2ComplexExample,
    // ParentWithReactiveChild,
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
