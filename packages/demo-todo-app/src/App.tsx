import {
  component,
} from 'tinaf/component';
import { div } from 'tinaf/dom';
import { Header } from './Header/Header';

import { RouterView, type PageComponent } from 'tinaf/router';
import { Link } from './ui/Link';
import { Example } from './tests/Example';
import { ShowExample } from './examples/ShowExample';

const MainContainer = component(({ children }) => {
  return div(...(children || [])).addClass('p-8 gap-8 flex flex-col ');
});
export const App: PageComponent = component(() => {
  return <div className="flex flex-col w-screen h-screen text-slate-800">
    <Header />


    <Example />

    <MainContainer>
      <RouterView />


    </MainContainer>

    
    <div className="flex gap-2">

      <Link to="/product/1">To product</Link>
      <Link to="/">To home</Link>
      <Link to="/dashboard/orders">To orders</Link>
    </div>

    <ShowExample />

  </div>
});
