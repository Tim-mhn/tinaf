import { component, componentWithProps } from '../framework/component';
import { button, div, span } from '../framework/dom/div';
import { bool, computed, reactive } from '../framework/reactive/reactive';
import { show } from '../framework/render';

const ShowWhenElse = component(() => {
  const [visible, toggleVisible] = bool(true);
  // setInterval(() => toggleVisible(), 2000);
  return div(show(div('visible')).when(visible).else(div('invisible')));
});

const ShowWhen = component(() => {
  const [visible, toggleVisible] = bool(true);

  const visibleString = computed(() => `${visible.value}`, [visible]);

  const toggleVisibleButton = button('toggle visibility')
    .on({
      click: toggleVisible,
    })
    .addClass('border border-blue-300 p-1 rounded-sm hover:bg-blue-100');

  return div(
    // span(visibleString),
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
    ShowWhenElse,
    ShowWhen,
    hello,
    world,
    Button,
    Card({ title: hello, subtitle: world })
  )
    .on({
      click: console.log,
    })
    .addClass('flex flex-col  gap-4');
});
