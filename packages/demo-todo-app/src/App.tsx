import {
  component,
  Switch,
} from 'tinaf/component';
import { div } from 'tinaf/dom';
import { Header } from './Header/Header';

import { RouterView, type PageComponent } from 'tinaf/router';
import { Link } from './ui/Link';
import { Example } from './tests/Example';
import { ShowExample } from './examples/ShowExample';
import { inputReactive, reactive } from 'tinaf/reactive';
import { useTimeout } from '../../core/src/common-hooks';
import { Match } from '../../core/src/component';

const MainContainer = component(({ children }) => {
  return div(...(children || [])).addClass('p-8 gap-8 flex flex-col ');
});
export const App: PageComponent = component(() => {


  // const placeholder = inputReactive("hello")


  // useTimeout(() => placeholder.update("world"), 1000)


  const condition = reactive('a')


  const updateCondition = () => {
    const rand = Math.random();
    if (rand > .7) condition.update('a')
    else if (rand > .4) condition.update('b')
    else condition.update('c')
  }


  return <div className="flex flex-col w-screen h-screen text-slate-800">
    <Header />


    <Example />

    <MainContainer>
      <RouterView />

      {/* <input className="border" placeholder={placeholder} /> */}


    </MainContainer>

    
    <div className="flex gap-2">

      <Link to="/product/1">To product</Link>
      <Link to="/">To home</Link>
      <Link to="/dashboard/orders">To orders</Link>
    </div>

    <ShowExample />



<button onClick={updateCondition}>update condition</button>

    <Switch condition={condition}>


{/* note: wrapping the elements in a html-like component is necessary for the moment */}
      <Match when="a">
        <div>a</div>
      </Match>

      <Match when="b">
        <div>b</div>
      </Match>

      <Match when="c">
        <div>c</div>
      </Match>

    </Switch>

  </div>
});
