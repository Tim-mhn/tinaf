import { component, componentWithProps } from '../framework/component';
import { button, div, span } from '../framework/dom/dom';
import { bool, computed, reactive } from '../framework/reactive/reactive';
import { show } from '../framework/render';

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

const Card = componentWithProps<{ title: string; subtitle: string }>(
  ({ title, subtitle }) => {
    return div(div(title), div(subtitle));
  }
);

const Header = component(() => {
  const title = reactive('Header');
  // setInterval(() => title.update('Header @' + Date.now()), 2000);
  return div(title).addClass('flex flex-col gap-16 border border-blue-300');
});

export const App = component(() => {
  const hello = reactive('hello');
  const world = reactive('world');

  setTimeout(() => world.update('world 2'), 5000);
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
    Card({ title: hello, subtitle: world })
  )
    .on({
      click: console.log,
    })
    .addClass('flex flex-col  gap-4');
});
