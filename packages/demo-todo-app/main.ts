import { createApp } from 'tinaf/render';
import { App } from './src/App';
import { routerBuilder, ROUTER_PROVIDER_KEY } from 'tinaf/router';
import { div } from 'tinaf/dom';

const app = createApp(App);

const Home = () => div('Home');
const Dashboard = () => div('Dashboard');
const router = routerBuilder()
  .withConfig([
    {
      path: '/',
      component: Home,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
  ])
  .build();

app.provide(ROUTER_PROVIDER_KEY, router);

app.render('app');
