import { component, componentWithProps } from '../framework/component';
import { button, div, span } from '../framework/dom/div';
import { bool, reactive } from '../framework/reactive/reactive';
import { show } from '../framework/render';

const ShowHide = component(() => {
  const [visible, toggleVisible] = bool(true);
  // setInterval(() => toggleVisible(), 2000);
  return show(div('visible')).when(visible).else(div('invisible'));
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
  return span(title);
});

export const App = component(() => {
  const hello = reactive('hello');
  const world = reactive('world');

  setTimeout(() => world.update('world 2'), 5000);
  return div(
    Header,
    ShowHide,
    hello,
    world,
    Button,
    Card({ title: hello, subtitle: world })
  ).on({
    click: console.log,
    mouseover: () => console.log('hovering !'),
  });
});
