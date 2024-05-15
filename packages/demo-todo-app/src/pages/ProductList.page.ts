import { div } from 'tinaf/dom';
import { SearchBar } from '../Header/SearchBar';
import { PRODUCTS } from '../data/products.mock';
import { ProductList } from '../ProductList/ProductList';
import type { Product } from '../models/product';
import { component } from 'tinaf/component';
import { reactiveList } from 'tinaf/reactive';

export const ProductListPage = component(() => {
  const products = reactiveList<Product>(PRODUCTS);

  return div(
    SearchBar({
      updateProducts: (ps) => products.update(ps),
    }),
    ProductList({ products })
  );
});
