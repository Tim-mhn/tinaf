import { createApp } from 'tinaf/render';
import { createRouter, PageComponent, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { createQueryClientProvider } from 'tinaf/http';
import { Home } from './pages/Home';
import { App } from './App';
import { Docs } from './pages/Docs';

const app = createApp(App);

const queryClientProvider = createQueryClientProvider();
app.use(queryClientProvider);

const router = createRouter([
  {
    path: '/docs',
    component: Docs as PageComponent,
  },
  {
    path: '/',
    component: Home as PageComponent,
  },
]);

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
