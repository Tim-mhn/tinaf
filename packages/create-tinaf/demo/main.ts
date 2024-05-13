import { createApp } from 'tinaf/render';
import { component } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { ROUTER_PROVIDER_KEY, RouterView, createRouter } from 'tinaf/router';
import { HomePage } from './Home/Home.page';
import { TodoListPage } from './Todos/TodoList.page';
import { Links } from './shared/Links';

const App = component(() => {
  return div(
    div('Welcome to TINAF starting app').addClass(
      'flex w-full p-4  items-center justify-start font-light text-3xl border-b border-slate-800'
    ),
    div(RouterView()).addClass('flex-grow px-4 py-16 flex flex-col '),
    Links()
  ).addClass('h-screen w-screen text-slate-800 bg-white flex flex-col');
});

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
