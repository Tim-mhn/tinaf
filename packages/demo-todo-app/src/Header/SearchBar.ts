import type { Product } from 'src/models/product';
import { component } from 'tinaf/component';
import { div, input, span } from 'tinaf/dom';
import { inputReactive } from 'tinaf/reactive';
import { PRODUCTS } from '../data/products.mock';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

export const SearchBar = component<{
  updateProducts: (products: Product[]) => void;
}>(({ updateProducts }) => {
  const searchInput = inputReactive('');

  searchInput.valueChanges$
    .pipe(
      map((s) => s.toLowerCase()),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((newInput) => {
      const newProducts = PRODUCTS.filter(
        (product) =>
          product.title.toLowerCase().includes(newInput) ||
          product.description.toLowerCase().includes(newInput)
      );

      updateProducts(newProducts);
    });

  return div(
    input(searchInput, { placeholder: 'What are you looking for ?' }).addClass(
      'outline-none w-full'
    ),
    span(searchInput)
  ).addClass(
    'p-4 border rounded-sm h-9 flex grow items-center justify-center  border-slate-800'
  );
});
