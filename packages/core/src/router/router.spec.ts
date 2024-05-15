import { describe, it, expect, vi } from 'vitest';
import {
  CurrentLocation,
  RouteChangeHandler,
  Router,
  RouterConfig,
} from './router';
import { fromPartial } from '../test-utils/from-partial';
import { flushPromises } from '../test-utils/flush-promises';

const buildTestRouter = (config: RouterConfig) => {
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

  return router;
};
class MockRouteChangeHandler implements RouteChangeHandler {
  private callback: () => void;
  onRouteChange(callback: () => void) {
    this.callback = callback;
  }
  publishRouteChange() {
    if (this.callback) this.callback();
  }
}

const buildMockHistory = () =>
  fromPartial<History>({
    pushState: vi.fn(),
  });

describe('Router', () => {
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

  it('returns the current route with the correct dynamic param', async () => {
    const Home = () => 'home';

    const Product = () => 'Product';

    const hasLocation: CurrentLocation = {
      location: fromPartial<Location>({
        pathname: '/',
      }),
    };
    const router = new Router(
      [
        { path: '/home', component: Home },
        { path: '/product/:id', component: Product },
      ],
      new MockRouteChangeHandler(),
      hasLocation,
      buildMockHistory()
    );

    router.init();

    hasLocation.location.pathname = '/product/123';
    router.navigate('/product/123');

    await flushPromises();

    expect(router.route.value).toEqual({
      path: '/product/123',
      params: {
        id: '123',
      },
    });
  });

  it('dynamic params', () => {
    const buildRegexString = (pattern: string) =>
      pattern
        .split('/')
        .map((path) => {
          if (path.startsWith(':')) return '(.*)';
          return path;
        })
        .join('/');

    function findDynamicParams(pattern: string, route: string) {
      const patternParts = pattern.split('/');
      const routeParts = route.split('/');

      const params: Record<string, string> = {};

      for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];
        const routePart = routeParts[i];

        if (patternPart.startsWith(':')) {
          const key = patternPart.slice(1);
          params[key] = routePart;
        }
      }

      return params;
    }

    const pattern = '/users/:userId/posts/:postId';

    const route = '/users/123/posts/456';

    const params = findDynamicParams(pattern, route);

    expect(params).toEqual({
      userId: '123',
      postId: '456',
    });
  });
});
