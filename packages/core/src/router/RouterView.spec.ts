import { describe, expect, it, vi } from 'vitest';
import { RouterView } from './RouterView';
import { buildMockParent } from '../test-utils/dom-element.mock';
import { buildTestRouter } from './test-utils';
import { setupFakeApp } from '../test-utils/fake-app';
import { buildMockComponent } from '../test-utils/component.mock';
describe('RouterView', () => {
  function setup({ initialPath = '/home' } = {}) {
    const Home = buildMockComponent('home');
    const Product = buildMockComponent('Product');

    const router = buildTestRouter(
      [
        { path: '/home', component: Home },
        { path: '/product/:id', component: Product },
      ],
      {
        initialPath,
      }
    );

    vi.spyOn(router, 'getComponentForPath');

    setupFakeApp({ router });

    const routerView = RouterView();

    const parent = buildMockParent();
    routerView.init(parent);

    return { router };
  }
  it('does  trigger a rerender if the route path has not changed', () => {
    const { router } = setup({ initialPath: '/home' });

    router.navigate('/home');

    expect(router.getComponentForPath).toHaveBeenCalledTimes(1);

    router.navigate('/home');

    expect(router.getComponentForPath).toHaveBeenCalledTimes(1);
  });

  it('triggers a rerender if the route path has changed', () => {
    const { router } = setup({ initialPath: '/home' });

    router.navigate('/product/a');

    expect(router.getComponentForPath).toHaveBeenCalledTimes(2);

    router.navigate('/home');

    expect(router.getComponentForPath).toHaveBeenCalledTimes(3);
  });

  it('does trigger a rerender when the path has changed but it corresponds to the same pattern', () => {
    const { router } = setup({ initialPath: '/product/a' });

    router.navigate('/product/b');

    expect(router.getComponentForPath).toHaveBeenCalledTimes(1);
  });

  describe('nested routes', () => {
    function setup({ initialPath }: { initialPath: string }) {
      const Home = buildMockComponent('home');
      const Dashboard = buildMockComponent('Dashboard');
      const Favorites = buildMockComponent('Favorites');
      const Orders = buildMockComponent('Orders');

      const router = buildTestRouter(
        [
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
              },
            ],
          },
        ],
        {
          initialPath,
        }
      );

      vi.spyOn(router, 'getComponentForPath');

      setupFakeApp({ router });

      const mainRouterView = RouterView({});
      const subRouterView = RouterView({});

      const parent = buildMockParent();

      return { router, parent, mainRouterView, subRouterView };
    }

    it('rerenders when the nested path has changed', () => {
      const { router, mainRouterView, subRouterView, parent } = setup({
        initialPath: '/dashboard/favorites',
      });

      mainRouterView.init(parent);
      subRouterView.init(parent);

      router.navigate('/dashboard/orders');

      expect(router.getComponentForPath).toHaveBeenCalledTimes(3);
    });

    it('rerenders correctly when the main path has changed', () => {
      const { router, subRouterView, mainRouterView, parent } = setup({
        initialPath: '/home',
      });

      mainRouterView.init(parent);

      expect(router.getComponentForPath).toHaveBeenCalledTimes(1);

      router.navigate('/dashboard/orders');
      subRouterView.init(parent);

      expect(router.getComponentForPath).toHaveBeenCalledTimes(3);

      expect(router.getComponentForPath).toHaveBeenCalledWith(
        '/dashboard/orders',
        { depth: 1 }
      );
    });

    it('rerenders correctly when we go from a depth:0 path to a depth:1 path', () => {
      const { router, subRouterView, mainRouterView, parent } = setup({
        initialPath: '/home',
      });

      mainRouterView.init(parent);

      expect(router.getComponentForPath).toHaveBeenCalledTimes(1);

      router.navigate('/dashboard/orders');
      subRouterView.init(parent);

      router.navigate('/home');
      subRouterView.destroy();

      expect(router.getComponentForPath).toHaveBeenCalledWith('/home', {
        depth: 0,
      });
    });
  });
});
