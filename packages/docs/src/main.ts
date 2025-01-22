import { createApp } from 'tinaf/render';
import { createRouter, PageComponent, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { createQueryClientProvider } from 'tinaf/http';
import { Home } from './pages/Home';
import { App } from './App';
import { Docs } from './pages/Docs';
import { IntroductionPage } from './pages/getting-started/Introduction';
import { QuickStartPage } from './pages/getting-started/QuickStart';
import { ReactivityPage } from './pages/essentials/Reactivity';
import { CreateApplicationPage } from './pages/essentials/CreateApplication';

const app = createApp(App);

const queryClientProvider = createQueryClientProvider();
app.use(queryClientProvider);

const router = createRouter([
  {
    path: '/docs',
    component: Docs as PageComponent,
    children: [
      {
        path: '/introduction',
        component: IntroductionPage as PageComponent,
      },
      {
        path: '/quick-start',
        component: QuickStartPage as PageComponent,
      },
      {
        path: '/create-application',
        component: CreateApplicationPage as PageComponent,
      },
      { path: '/reactivity', component: ReactivityPage as PageComponent },
    ],
  },
  {
    path: '/',
    component: Home as PageComponent,
  },
]);

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
