import { component, buildSwitchComponent } from '../component';
import { injectApp } from '../common';
import { ROUTER_PROVIDER_KEY } from './provider.key';
import type { Router } from './router';

export const RouterView = component(() => {
  const tinafApp = injectApp();

  const router = tinafApp.get<Router>(ROUTER_PROVIDER_KEY);

  router.init();

  const switchComponentBasedOnRoute = buildSwitchComponent(
    router.route,
    (newRoute) => {
      const pathComponent = router.getComponentForPath(newRoute.pathname);

      const res = pathComponent?.() || null;

      return res;
    }
  );

  return switchComponentBasedOnRoute;
});
