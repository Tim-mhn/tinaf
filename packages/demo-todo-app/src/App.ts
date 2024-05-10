import { component, forLoop, type VComponent } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { Header } from './Header/Header';
import { reactiveList } from 'tinaf/reactive';

import { ProductList } from './ProductList/ProductList';
import { PRODUCTS } from './Header/products.mock';
import type { Product } from './models/product';

const MainContainer = component(({ children }) => {
  return div(...children).addClass('p-8 gap-8 flex flex-col ');
});
export const App: () => VComponent = component(() => {
  const products = reactiveList<Product>(PRODUCTS);

  return div(
    Header({ updateProducts: (ps) => products.update(ps) }),
    MainContainer({
      children: [ProductList({ products })],
    })
  ).addClass('flex flex-col w-screen h-screen text-slate-800');
});
