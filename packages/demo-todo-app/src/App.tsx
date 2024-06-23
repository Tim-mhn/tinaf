import {
  componentV2,
} from 'tinaf/component';
import { div } from 'tinaf/dom';
import { Header } from './Header/Header';

import { RouterView } from 'tinaf/router';
import { Link } from './ui/Link';
import { Example } from './tests/Example';

const MainContainer = componentV2(({ children }) => {
  return div(...(children || [])).addClass('p-8 gap-8 flex flex-col ');
});
export const App = componentV2(() => {
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
  </div>
});
