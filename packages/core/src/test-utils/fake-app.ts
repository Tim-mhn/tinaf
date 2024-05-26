import { TinafApp, createApp } from '../render';
import { fromPartial } from './from-partial';
import { ROUTER_PROVIDER_KEY } from '../router';
import type { Router } from '../router/router';

let fakeTinafApp = fromPartial<TinafApp>({});
export const provideFakeTinafApp = (fakeApp: TinafApp) => {
  fakeTinafApp = fakeApp;
};

export const injectFakeTinafApp = () => fakeTinafApp;

const createFakeApp = () => createApp(() => '' as any);

export const setupFakeApp = ({ router }: { router: Router }) => {
  const fakeApp = createFakeApp();
  fakeApp.provide(ROUTER_PROVIDER_KEY, router);
  provideFakeTinafApp(fakeApp);
  return fakeApp;
};
