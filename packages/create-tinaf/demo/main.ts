import { createApp } from 'tinaf/render';
import { ROUTER_PROVIDER_KEY, createRouter } from 'tinaf/router';
import { HomePage } from './Home/Home.page';
import { TodoListPage } from './Todos/TodoList.page';
import { App } from './App';



const router = createRouter([
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/todos',
    component: TodoListPage,
  },
]);

const app = createApp(App).provide(ROUTER_PROVIDER_KEY, router);

app.render('container');
