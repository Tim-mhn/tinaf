import { createApp } from 'tinaf/render';
import { createRouter, PageComponent, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { createQueryClientProvider } from 'tinaf/http';
import { Home } from './pages/Home';
import { App } from './App';
import { Docs } from './pages/Docs';
import { IntroductionPage } from './pages/getting-started/Introduction';
import { QuickStartPage } from './pages/getting-started/QuickStart';
import { ReactivityPage } from './pages/essentials/Reactivity';
import { ComponentsDocPage } from './pages/essentials/ComponentsDoc.page';

const app = createApp(App);

const queryClientProvider = createQueryClientProvider();
app.use(queryClientProvider);

const router = createRouter([
  {
    path: '/foo',
    redirect: '/',
  },
  {
    path: '/docs',
    redirect: '/docs/introduction',
    component: Docs as PageComponent,
    children: [
      {
        path: '/bar',
        redirect: '/introduction',
      },
      {
        path: '/introduction',
        component: IntroductionPage as PageComponent,
      },
      {
        path: '/quick-start',
        component: QuickStartPage as PageComponent,
      },
      {
        path: '/components',
        component: ComponentsDocPage as PageComponent,
      },
      { path: '/reactivity', component: ReactivityPage as PageComponent },
      {
        path: '/for-loops',
        component: IntroductionPage as PageComponent,
      },
      {
        path: '/conditional-rendering',
        component: IntroductionPage as PageComponent,
      },
      {
        path: '/styling',
        component: IntroductionPage as PageComponent,
      },
      {
        path: '/routing',
        component: IntroductionPage as PageComponent,
      },
    ],
  },
  {
    path: '/',
    component: Home as PageComponent,
  },
]);

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
