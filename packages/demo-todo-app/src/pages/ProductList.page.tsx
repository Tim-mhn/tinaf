import { div } from 'tinaf/dom';
import { SearchBar } from '../Header/SearchBar';
import { ProductList } from '../ProductList/ProductList';
import { component } from 'tinaf/component';
import { useQuery } from '../../../core/src/http';
import { getAllProducts } from '../api/products';
import type { Product } from '../models/product';

export const ProductListPage = component(() => {
  const { data: products, isPending } = useQuery({
    queryKey: 'products',
    queryFn: getAllProducts,
    initialValue: [] as Product[],
  });

  return <div>
    <SearchBar updateProducts={(ps) => products.update(ps)} />
    <ProductList  products={products} pending={isPending} />
  
  </div>
});
