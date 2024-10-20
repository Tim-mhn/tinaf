import { createApp } from 'tinaf/render';
import { ROUTER_PROVIDER_KEY, createRouter } from 'tinaf/router';
import { HomePage } from './src/Home/Home.page';
import { TodoListPage } from './src/Todos/TodoList.page';
import { App } from './src/App';

const router = createRouter([
  {
    path: '/todos',
    component: TodoListPage,
  },
  // keep this one at the end otherwise it will be matched by any route
  // FIXME
  {
    path: '/',
    component: HomePage,
  },
]);

const app = createApp(App).provide(ROUTER_PROVIDER_KEY, router);

app.render('container');
