import type { Product } from 'src/models/product';
import {  component, For } from 'tinaf/component';
import {
  maybeComputed,
  toReactiveProps,
  toValue,
} from 'tinaf/reactive';
import { injectRouter } from 'tinaf/router';

// #F3F3F5
const ProductCard = component<{ product: Product; onClick: () => void }>(
  ({ product, onClick }) => {
    const { title, image, price } = toReactiveProps(product);

    const priceText = maybeComputed(() => `${toValue(price)} EUR`, [price]);

    return <li className="flex flex-col justify-center items-center">

<button className="flex flex-col w-full h-full" onClick={onClick}>


<div className="border-r border-t border-b border-black bg-[#F3F3F5] flex grow w-full items-center justify-center  p-8">
  <img className="max-h-[180px] w-auto object-fit " src={toValue(image)} />
</div>

<div className='pt-1 px-4 text-slate-900  text-md font-light w-full flex flex-col gap-2'>
  <div className="truncate">{title}</div>
  <div> {priceText}</div>
</div>
</button>

</li>

  })

  
export const ProductList = component<{ products: Product[] }>(
  ({ products }) => {
    const router = injectRouter();

    const goToProductPage = (p: Product) => router.navigate(`/product/${p.id}`);

    return <div>
    <ul className="grid border border-black gap-y-8 grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-fit">

      <For each={products} keyFunction={(p) => p.id}>
      {(product: Product) => ProductCard({ product, onClick: () => goToProductPage(product) }) }
      </For>
    </ul>


  

    </div>

  })
  
    
