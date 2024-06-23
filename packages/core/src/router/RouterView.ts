import { buildSwitchComponent, component } from '../component';
import { injectApp, logger } from '../common';
import { ROUTER_PROVIDER_KEY } from './provider.key';
import type { Router } from './router';
import { computed } from '../reactive';

export const ROUTER_VIEW_DEPTH_KEY = Symbol('router-view-depth');

// TODO: need to add a onDestroy to remove that subscription
export const RouterView = component(() => {
  const tinafApp = injectApp();

  const router = tinafApp.get<Router>(ROUTER_PROVIDER_KEY);

  router.init(() => {
    tinafApp.provide(ROUTER_VIEW_DEPTH_KEY, 0);
  });

  const depth = tinafApp.get<number>(ROUTER_VIEW_DEPTH_KEY, 0);

  tinafApp.provide(ROUTER_VIEW_DEPTH_KEY, depth + 1);

  const routePattern = computed(() => {
    const route = router.getMatchingRoute({
      path: router.route.value.path,
      depth,
    });

    return route?.path || '';
  }, [router.route]);

  const decrementDepth = () => {
    const currentDepth = tinafApp.get<number>(ROUTER_VIEW_DEPTH_KEY, 0);
    tinafApp.provide(ROUTER_VIEW_DEPTH_KEY, currentDepth - 1);
  };

  /**
   * NOTE: we don't use routePattern value here, but we only rerender the the route pattern changes
   * instead of the route path
   * If we have a route matching the pattern: "/product/:id" and we navigate from "/product/1" to "/product/2" we shouldn't rerender the component
   */
  const switchComponentBasedOnRoute = buildSwitchComponent(
    routePattern,
    (_routePattern) => {
      const path = router.route.value.path;

      const pathComponent = router.getComponentForPath(path, {
        depth,
      });

      if (!pathComponent) {
        logger.warn(
          `No matching component found for path ${path} and depth ${depth}`
        );
      }

      const res = pathComponent?.() || null;

      return res;
    },
    {
      onDestroy: decrementDepth,
    }
  );

  return switchComponentBasedOnRoute;
});
