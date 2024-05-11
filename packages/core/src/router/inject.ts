import { injectApp } from '../common';
import type { Router } from './router';
import { ROUTER_PROVIDER_KEY } from './provider.key';

export const injectRouter = () => {
  const tinafApp = injectApp();
  const router = tinafApp.get<Router>(ROUTER_PROVIDER_KEY);
  return router;
};
