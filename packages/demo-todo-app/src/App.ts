import { component, forLoop, type VComponent } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { Header } from './Header/Header';
import { reactiveList } from 'tinaf/reactive';

import { ProductList } from './ProductList/ProductList';
import { PRODUCTS } from './Header/products.mock';
import type { Product } from './models/product';
import { RouterView, injectRouter } from 'tinaf/router';

const MainContainer = component(({ children }) => {
  return div(...children).addClass('p-8 gap-8 flex flex-col ');
});
export const App: () => VComponent = component(() => {
  const products = reactiveList<Product>(PRODUCTS);

  const router = injectRouter();

  return div(
    Header({ updateProducts: (ps) => products.update(ps) }),
    MainContainer({
      children: [ProductList({ products })],
    }),
    div(
      button('Go to home').on({
        click: () => router.navigate('/'),
      }),
      button('Go to dashboard').on({
        click: () => router.navigate('/dashboard'),
      })
    ),
    RouterView()
  ).addClass('flex flex-col w-screen h-screen text-slate-800');
});
