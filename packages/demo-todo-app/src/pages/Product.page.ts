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

  console.log({ route: router.route.value });
  return div(
    div(title).addClass('text-4xl text-semibold'),
    div(description).addClass('text-md font-light'),
    img({ src: toValue(image) }).addClass('h-[360px] w-[360px] object-contain'),
    div(span(price), span('€')).addClass('text-xl text-semibold')
  ).addClass('flex flex-col items-center gap-8');
});
