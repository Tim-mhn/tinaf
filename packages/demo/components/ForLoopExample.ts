import { reactive, toValue } from '../../core/src/reactive';
import {
  component,
  componentWithProps,
} from '../../core/src/component/component';
import { button, div, span } from '../../core/src/dom/dom';
import { forLoopRender } from '../../core/src/component/for-loop';

const randomInt = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min));

const getProducts = () =>
  Array.from({ length: 10 }).map((_, index) => {
    const id = crypto.randomUUID();

    return {
      title: `Product ${id}`,
      description: `Description ${id}`,
      price: randomInt(50, 1000),
    };
  });

type Product = {
  title: string;
  price: number;
  description: string;
};

const ProductCard = componentWithProps<{ product: Product }>(({ product }) => {
  const itemCount = reactive(0);

  const increment = () => itemCount.update(itemCount.value + 1);
  const decrement = () =>
    itemCount.value > 0 ? itemCount.update(itemCount.value - 1) : null;

  return div(
    div(toValue(product).title),
    div(toValue(product).description),
    div(
      button('-').on({ click: decrement }),
      span(itemCount),
      button('+').on({ click: increment })
    ).addClass('flex space-around')
  ).addClass('flex flex-col w-fit p-1 gap-1 bg-blue-300 rounded-sm');
});

export const ForLoopV2ComplexExample = component(() => {
  const products = reactive(getProducts());

  const fetchMore = () => {
    const newProducts = getProducts();
    products.update([...products.value, ...newProducts]);
  };

  return div(
    div(
      forLoopRender(products, (product) => ProductCard({ product }))
    ).addClass('grid grid-cols-4 gap-4'),
    button('Fetch more').on({
      click: fetchMore,
    })
  ).addClass('flex flex-col border-slate-300 p-4 gap-4');
});
