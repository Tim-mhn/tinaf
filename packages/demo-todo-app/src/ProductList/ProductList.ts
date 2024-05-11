import type { Product } from 'src/models/product';
import { component, forLoop } from 'tinaf/component';
import { div, li, ul, img, button } from 'tinaf/dom';
import {
  computed,
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

    return li(
      button(
        div(
          img({
            // TODO: this should be able to be reactive
            src: toValue(image),
          }).addClass('max-h-[180px] w-auto object-fit ')
        ).addClass(
          ' border-r border-t border-b border-black bg-[#F3F3F5] flex grow w-full items-center justify-center  p-8'
        ),
        div(div(title).addClass('truncate'), div(priceText)).addClass(
          'pt-1 px-4 text-slate-900  text-md font-light w-full flex flex-col gap-2  '
        )
      )
        .on({ click: () => onClick() })
        .addClass('flex flex-col w-full h-full')
    ).addClass('flex flex-col justify-center items-center ');
  }
);
export const ProductList = component<{ products: Product[] }>(
  ({ products }) => {
    const router = injectRouter();

    const goToProductPage = () => router.navigate('product');
    return ul(
      forLoop(
        products,
        (product) => ProductCard({ product, onClick: goToProductPage }),
        (p) => p.id
      )
    ).addClass(
      'grid border border-black gap-y-8 grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-fit'
    );
  }
);
