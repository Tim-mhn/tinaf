import { component, type VComponent } from 'tinaf/component';
import { div, img, span } from 'tinaf/dom';
import { computed, toReactiveProps } from 'tinaf/reactive';
import { injectRouter, type PageComponent} from 'tinaf/router';
import { getProduct } from '../api/products';

export const ProductPage: PageComponent = component(() => {
  const router = injectRouter();

  const productId = computed(
    () => router.route.value.params.productId,
    [router.route]
  );

  const product = computed(() => getProduct(productId.value));

  const { title, description, image, price, rating: { rate, count } } = toReactiveProps(product, { deep: true});


  return <div className="flex flex-col items-center gap-8">


    <div className="text-4xl font-semibold">{title}</div>

    <div className="text-md font-light">{description}</div>

    <img className="h-[360px] w-[360px] object-contain" src={image} />

    <div className="text-xl font-semibold">
      <span>{price}</span>
      <span>€</span>

      <div className="text-sm font-light">
      <span>{rate}/5</span>
      <span>({count} reviews)</span>
    </div>
    
    </div>
    
    
  </div>
});




