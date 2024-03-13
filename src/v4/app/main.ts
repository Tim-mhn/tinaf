import { bool, reactive } from '../framework/reactive/reactive';
import { renderApp } from '../framework/render';
import { component, div, renderAppV4_2, show } from '../framework/render-2';
import { App } from './App';

const ShowHide = component(() => {
  const [visible, toggleVisible] = bool(true);

  setInterval(() => toggleVisible(), 2000);
  return show(div('visible')).when(visible).else(div('invisible'));
});
const Header = component(() => {
  const title = reactive('Header');
  setTimeout(() => title.update('Header @' + Date.now()), 2000);

  return div(title);
});
const App = component(() => {
  const hello = reactive('hello');
  const world = reactive('world');

  return div(Header, ShowHide, hello, world);
});

renderAppV4_2('app', App);
