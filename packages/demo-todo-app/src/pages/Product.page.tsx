import { getProduct } from '../data/products.mock';
import { component } from 'tinaf/component';
import { div, img, span } from 'tinaf/dom';
import { computed, toReactiveProps, toValue } from 'tinaf/reactive';
import { injectRouter } from 'tinaf/router';

export const ProductPage = component(() => {
  const router = injectRouter();

  const productId = computed(
    () => router.route.value.params.productId,
    [router.route]
  );

  const product = computed(() => getProduct(productId.value), [productId]);

  const { title, description, image, price, rating } = toReactiveProps(product);

  return <div className="flex flex-col items-center gap-8">


    <div className="text-4xl font-semibold">{title}</div>

    <div className="text-md font-light">{description}</div>

    <img className="h-[360px] w-[360px] object-contain" src={toValue(image)} />

    <div className="text-xl font-semibold">
      <span>{price}</span>
      <span>€</span>
    </div>
  </div>
});
