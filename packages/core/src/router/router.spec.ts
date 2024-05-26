import { describe, it, expect, vi } from 'vitest';
import { CurrentLocation, Router, RouterConfig } from './router';
import { fromPartial } from '../test-utils/from-partial';
import { flushPromises } from '../test-utils/flush-promises';

import {
  MockRouteChangeHandler,
  buildMockHistory,
  buildTestRouter,
} from './test-utils';

describe('Router', () => {
  describe('getComponentForPath', () => {
    it('returns the right component with simple paths', () => {
      const Home = () => 'home';
      const About = () => 'about';

      const router = buildTestRouter([
        { path: '/home', component: Home },
        { path: '/about', component: About },
      ]);

      expect(router.getComponentForPath('/home')).toBe(Home);
      expect(router.getComponentForPath('/about')).toBe(About);
    });

    it('returns the right component with a dynamic path', () => {
      const Home = () => 'home';
      const Product = () => 'Product';

      const router = buildTestRouter([
        { path: '/home', component: Home },
        { path: '/product/:id', component: Product },
      ]);

      expect(router.getComponentForPath('/product/123')).toBe(Product);
    });

    describe('nested paths', () => {
      it('finds the correct component for a depth 0 path', () => {
        const Home = () => 'home';
        const Dashboard = () => 'dasboard';

        const Favorites = () => 'favorites';
        const Orders = () => 'orders';

        const router = buildTestRouter([
          { path: '/home', component: Home },
          {
            path: '/dashboard',
            component: Dashboard,
            children: [
              {
                path: '/favorites',
                component: Favorites,
              },
              { path: '/orders', component: Orders },
            ],
          },
        ]);

        const component = router.getComponentForPath('/dashboard/favorites', {
          depth: 0,
        });

        expect(component).toEqual(Dashboard);
      });

      it('finds the correct component for a depth 1 path', () => {
        const Home = () => 'home';
        const Dashboard = () => 'dasboard';

        const Favorites = () => 'favorites';
        const Orders = () => 'orders';

        const OrderPage = () => 'Order';

        const router = buildTestRouter([
          { path: '/home', component: Home },
          {
            path: '/dashboard',
            component: Dashboard,
            children: [
              {
                path: '/favorites',
                component: Favorites,
              },
              {
                path: '/orders',
                component: Orders,
                children: [
                  {
                    path: '/myLastOrder',
                    component: OrderPage,
                  },
                ],
              },
            ],
          },
        ]);

        const component = router.getComponentForPath(
          '/dashboard/orders/myLastOrder',
          {
            depth: 1,
          }
        );

        expect(component).toEqual(Orders);
      });

      it('finds the correct component for a depth 2 path', () => {
        const Home = () => 'home';
        const Dashboard = () => 'dasboard';

        const Favorites = () => 'favorites';
        const Orders = () => 'orders';

        const OrderPage = () => 'Order';

        const router = buildTestRouter([
          { path: '/home', component: Home },
          {
            path: '/dashboard',
            component: Dashboard,
            children: [
              {
                path: '/favorites',
                component: Favorites,
              },
              {
                path: '/orders',
                component: Orders,
                children: [
                  {
                    path: '/myLastOrder',
                    component: OrderPage,
                  },
                ],
              },
            ],
          },
        ]);

        const component = router.getComponentForPath(
          '/dashboard/orders/myLastOrder',
          {
            depth: 2,
          }
        );

        expect(component).toEqual(OrderPage);
      });

      it('finds the correct component for a nested path with a dynamic param,', () => {
        const Home = () => 'home';
        const Dashboard = () => 'dasboard';

        const Favorites = () => 'favorites';
        const Orders = () => 'orders';

        const OrderPage = () => 'Order';

        const OrderDetails = () => 'Details';

        const router = buildTestRouter([
          { path: '/home', component: Home },
          {
            path: '/dashboard',
            component: Dashboard,
            children: [
              {
                path: '/favorites',
                component: Favorites,
              },
              {
                path: '/orders',
                component: Orders,
                children: [
                  {
                    path: '/:orderId',
                    component: OrderPage,
                    children: [
                      {
                        path: '/details',
                        component: OrderDetails,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]);

        const shouldBeOrderPage = router.getComponentForPath(
          '/dashboard/orders/12345/details',
          {
            depth: 2,
          }
        );

        const shouldBeDetails = router.getComponentForPath(
          '/dashboard/orders/12345/details',
          {
            depth: 3,
          }
        );

        expect(shouldBeOrderPage).toEqual(OrderPage);
        expect(shouldBeDetails).toEqual(OrderDetails);
      });
    });
  });

  describe('Current route', () => {
    function setup(config: RouterConfig) {
      const hasLocation: CurrentLocation = {
        location: fromPartial<Location>({
          pathname: '/',
        }),
      };
      const router = new Router(
        config,
        new MockRouteChangeHandler(),
        hasLocation,
        buildMockHistory()
      );

      router.init();

      async function navigate(path: string) {
        hasLocation.location.pathname = path;
        router.navigate(path);

        await flushPromises();
      }

      return { router, navigate };
    }
    it('returns the current route with the correct dynamic param', async () => {
      const Home = () => 'home';

      const Product = () => 'Product';

      const { router, navigate } = setup([
        { path: '/home', component: Home },
        { path: '/product/:id', component: Product },
      ]);

      await navigate('/product/123');

      expect(router.route.value).toEqual({
        path: '/product/123',
        params: {
          id: '123',
        },
      });
    });

    it('returns the current route with the correct dynamic param when using nested paths', async () => {
      const Home = () => 'home';

      const ProductPageContainer = () => 'ProductPageContainer';
      const ProductPage = () => 'ProductPage';

      const { navigate, router } = setup([
        { path: '/home', component: Home },
        {
          path: '/product',
          component: ProductPageContainer,
          children: [
            {
              path: '/:productId',
              component: ProductPage,
            },
          ],
        },
      ]);

      await navigate('/product/123');

      expect(router.route.value).toEqual({
        path: '/product/123',
        params: {
          productId: '123',
        },
      });
    });

    it('returns the current route with the correct dynamic param when using nested paths, more complex', async () => {
      const Home = () => 'home';

      const ProductPage = () => 'ProductPage';

      const ProductDetailsStep = () => 'ProductDetailsStep';

      const { navigate, router } = setup([
        { path: '/home', component: Home },
        {
          path: '/product/:productId',
          component: ProductPage,
          children: [
            {
              path: '/details/:step',
              component: ProductDetailsStep,
            },
          ],
        },
      ]);

      await navigate('/product/123/details/battery');

      expect(router.route.value).toEqual({
        path: '/product/123/details/battery',
        params: {
          productId: '123',
          step: 'battery',
        },
      });
    });
  });
});
