import { component, forLoop, type VComponent } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { Header } from './Header/Header';

import { RouterView, injectRouter } from 'tinaf/router';

const MainContainer = component(({ children }) => {
  return div(...children).addClass('p-8 gap-8 flex flex-col ');
});
export const App: () => VComponent = component(() => {
  const router = injectRouter();

  return div(
    Header(),

    MainContainer({
      children: [RouterView()],
    })
  ).addClass('flex flex-col w-screen h-screen text-slate-800');
});
