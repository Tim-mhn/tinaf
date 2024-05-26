import { component, forLoop, type VComponent } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { Header } from './Header/Header';

import { RouterView } from 'tinaf/router';
import { Link } from './ui/Link';

const MainContainer = component(({ children }) => {
  return div(...children).addClass('p-8 gap-8 flex flex-col ');
});
export const App: () => VComponent = component(() => {
  return div(
    Header(),

    MainContainer({
      children: [RouterView()],
    }),

    div(
      Link({ to: '/product/1', children: 'To product' }),
      Link({ to: '/', children: 'To home' }),
      Link({ to: '/dashboard/orders', children: 'To orders' })
    ).addClass('flex gap-2')
  ).addClass('flex flex-col w-screen h-screen text-slate-800');
});
