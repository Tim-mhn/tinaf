import { component, componentWithProps } from '../core/src/component/component';
import { button, div, span } from '../core/src/dom/dom';
import { bool, computed, not, reactive } from '../core/src/reactive';
import { show } from '../core/src/component/show';
import { forLoopRender } from '../core/src/component/for-loop';
import { ForLoopV2ComplexExample } from './components/ForLoopExample';

const Counter = component(() => {
  const count = reactive(0);

  return div(
    div(count),
    button('Increment').on({ click: () => count.update(count.value + 1) })
  ).addClass('flex border border-slate-300 gap-4');
});

const ConditionalCounter = component(() => {
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
const ShowWhenElse = component(() => {
  const [visible, toggleVisible] = bool(true);
  // setInterval(() => toggleVisible(), 2000);
  return div(show(div('visible')).when(visible).else(div('invisible')));
});

const AddStylesReactiveExample = component(() => {
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

const DynamicConditionalClassesExample = componentWithProps<{
  active: boolean;
}>(({ active }) => {
  return div('Example of dynamic conditional classes').addClass({
    'bg-green-300 text-green-600': active,
    'bg-red-300 text-red-800': not(active),
  });
});

const ToggleClasses = component(() => {
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

const RenderForLoopV2Example = component(() => {
  const todos = reactive(['Hello', 'Foo', 'Bar']);

  const addTodo = (todo: string) => todos.update([...todos.value, todo]);

  const removeTodo = (todo: string) =>
    todos.update([...todos.value].filter((t) => t !== todo));

  const insertTodo = () =>
    todos.update([todos.value[0], 'bazz', ...todos.value.slice(1)]);

  return div(
    div(
      button('Add todo').on({
        click: () => addTodo('test'),
      }),
      button('remove todo').on({
        click: () => removeTodo('Hello'),
      }),
      button('insert todo').on({
        click: insertTodo,
      })
    ).addClass('flex gap-8 border-b'),
    div(
      forLoopRender(todos, (todo) =>
        div(
          div(todo).addClass('bg-blue-300 text-blue-800'),
          button('X').on({
            click: () => removeTodo(todo),
          })
        ).addClass('flex w-fit p-2 gap-2 border border-slate-300')
      )
    ).addClass('flex flex-col ')
  ).addClass('flex flex-col gap-4');
});

const ShowWhen = component(() => {
  const [visible, toggleVisible] = bool(true);

  const toggleVisibleButton = button('toggle visibility')
    .on({
      click: toggleVisible,
    })
    .addClass('border border-blue-300 p-1 rounded-sm hover:bg-blue-100');

  return div(
    span(visible),
    show(div('hello i"m visible').addClass('custom-div')).when(visible),
    toggleVisibleButton
  ).addClass('flex flex-row gap-4 border border-blue-300 p-1');
});

const Button = component(() => {
  return button('Click');
});

const Card = componentWithProps<
  { title: string; subtitle: string },
  {
    onAdd: () => void;
  },
  ['content']
>(({ title, subtitle, onAdd, content }) => {
  return div(
    div(title),
    div(content).addClass('border p-2 border-slate-300'),
    div(subtitle),
    button('Add').on({ click: onAdd })
  );
});

const Header = component(() => {
  const title = reactive('Header');

  // setInterval(() => title.update('Header @' + Date.now()), 2000);
  return div(title).addClass('flex flex-col gap-16 border border-blue-300');
});

export const App = component(() => {
  const hello = reactive('hello');
  const world = reactive('world');

  const [active, toggleActive] = bool(true);

  // setTimeout(() => world.update('world 2'), 5000);
  return div(
    Header,
    ToggleClasses,
    ShowWhenElse,
    ShowWhen,
    hello,
    world,
    Button,
    AddStylesSimpleExample,
    AddStylesReactiveExample,
    DynamicConditionalClassesExample({ active }),
    button('Toggle active to toggle classes').on({
      click: toggleActive,
    }),
    ConditionalCounter,
    Card({
      title: hello,
      subtitle: world,
      content: div('This is custom content'),
      onAdd: () => console.log('added !'),
    }),
    RenderForLoopV2Example,
    ForLoopV2ComplexExample
  ).addClass('flex flex-col  gap-4 p-4');
});
