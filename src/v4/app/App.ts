import { component } from '../framework/component';
import { button, div, span } from '../framework/dom/div';
import { bool, reactive } from '../framework/reactive/reactive';
import { show } from '../framework/render';

const ShowHide = component(() => {
  const [visible, toggleVisible] = bool(true);
  setInterval(() => toggleVisible(), 2000);
  return show(div('visible')).when(visible).else(div('invisible'));
});

const Button = component(() => {
  return button('Click');
});

const Header = component(() => {
  const title = reactive('Header');
  setInterval(() => title.update('Header @' + Date.now()), 2000);
  return span(title);
});

export const App = component(() => {
  const hello = reactive('hello');
  const world = reactive('world');
  return div(Header, ShowHide, hello, world, Button).on({
    click: console.log,
    mouseover: () => console.log('hovering !'),
  });
});
