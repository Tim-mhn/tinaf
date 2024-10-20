import type { Product } from 'src/models/product';
import { component, For, Show } from 'tinaf/component';
import {
  computed,

  toReactiveProps,
  toValue,
} from 'tinaf/reactive';
import { injectRouter } from 'tinaf/router';
import { Skeleton } from '../ui/Skeleton';

// #F3F3F5
const ProductCard = component<{ product: Product; onClick: () => void }>(
  ({ product, onClick }) => {
    const { title, image, price } = toReactiveProps(product);

    const priceText = computed(() => `${toValue(price)} EUR`);

    return (
      <li className="flex flex-col justify-center items-center">
        <button className="flex flex-col w-full h-full" onClick={onClick}>
          <div className="border-r border-t border-b border-black bg-[#F3F3F5] flex grow w-full items-center justify-center  p-8">
            <img
              className="max-h-[180px] w-auto object-fit "
              src={toValue(image)}
            />
          </div>

          <div className="pt-1 px-4 text-slate-900  text-md font-light w-full flex flex-col gap-2">
            <div className="truncate">{title}</div>
            <div> {priceText}</div>
          </div>
        </button>
      </li>
    );
  }
);

const ProductListSkeleton = component(() => {
  const fakeCardsCount = 20;

  const fakeCards = Array.from({ length: fakeCardsCount }).fill('');

  return <div>loading ...</div>
  return (
      <For each={fakeCards}>{() => <Skeleton className="h-[250px] w-[250px]" />}</For>
  );
});

export const ProductList = component<{
  products: Product[];
  pending?: boolean;
}>(({ products, pending }) => {
  const router = injectRouter();

  const goToProductPage = (p: Product) => router.navigate(`/product/${p.id}`);



  const showProducts = computed(() => !toValue(pending) && toValue(products).length > 0)

  return (
    <div>
      <ul className="grid border border-black gap-y-8 grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-fit">


        <Show when={showProducts} fallback={<ProductListSkeleton />}>
          <For each={products} keyFunction={(p) => p.id}>
            {(product: Product) =>
              ProductCard({ product, onClick: () => goToProductPage(product) })
            }
          </For>

        </Show>

      </ul>
    </div>
  );
});
