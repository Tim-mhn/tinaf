import { createApp } from 'tinaf/render';
import { App } from './src/App';
import { createRouter, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { ProductListPage } from './src/pages/ProductList.page';
import { ProductPage } from './src/pages/Product.page';
import { DashboardRoutes } from './src/dashboard/routes';
import { createQueryClientProvider } from 'tinaf/http';

const app = createApp(App);

const queryClientProvider = createQueryClientProvider();
app.use(queryClientProvider);

const router = createRouter([
  {
    path: '/product/:productId',
    component: ProductPage,
  },
  ...DashboardRoutes,
  {
    path: '/',
    component: ProductListPage,
  },
]);

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
