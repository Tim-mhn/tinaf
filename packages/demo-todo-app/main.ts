import { createApp } from 'tinaf/render';
import { App } from './src/App';
import { routerBuilder, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { ProductListPage } from './src/pages/ProductList.page';
import { ProductPage } from './src/pages/Product.page';

const app = createApp(App);

const router = routerBuilder()
  .withConfig([
    {
      path: '/',
      component: ProductListPage,
    },
    {
      path: '/product',
      component: ProductPage,
    },
  ])
  .build();

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
