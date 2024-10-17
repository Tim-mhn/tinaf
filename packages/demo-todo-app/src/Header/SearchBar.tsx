import type { Product } from 'src/models/product';
import {  component, onDestroy } from 'tinaf/component';
import { inputReactive } from 'tinaf/reactive';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { PRODUCTS } from '../api/products';

export const SearchBar = component<{
  updateProducts: (products: Product[]) => void;
}>(({ updateProducts }) => {
  const searchInput = inputReactive('');

  // TODO: create an effect hook to avoid having to manually call .unsubscribe
  const sub = searchInput.valueChanges$
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

  onDestroy(() => {
    sub.unsubscribe();
  });

  return <div className='p-4 border rounded-sm h-9 flex grow items-center justify-center  border-slate-800'>
    <input  placeholder='What are you looking for ?' className='outline-none w-full' value={searchInput} />


  </div>
   
  
});
