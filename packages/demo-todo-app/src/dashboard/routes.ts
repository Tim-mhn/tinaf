import { Link } from '../ui/Link';
import { component, onDestroy, onInit } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { RouterLink, RouterView, type RouterConfig } from 'tinaf/router';

const DashboardContainer = component(() => {
  return div(
    div('Dashboard'),
    RouterView(),
    div(
      Link({
        to: '/dashboard/orders',
        children: 'Orders',
      }),
      Link({
        to: '/dashboard/favorites',
        children: 'favorites',
      })
    ).addClass('flex items-center gap-4')
  );
});

const Orders = component(() => {
  onInit(() => {
    console.log('Orders component initialized');
  });

  onDestroy(() => {
    console.log('Orders component destroyed');
  });
  return div('Orders');
});

const Favorites = component(() => div('Favorites'));
export const DashboardRoutes: RouterConfig = [
  {
    path: '/dashboard',
    component: DashboardContainer,
    children: [
      {
        path: '/orders',

        component: Orders,
      },
      {
        path: '/favorites',
        component: Favorites,
      },
    ],
  },
];
