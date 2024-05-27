import { TinafApp, createApp } from '../render';
import { fromPartial } from './from-partial';
import { ROUTER_PROVIDER_KEY, type Router } from '../router';
import type { IDocument, IWindow } from 'src/render/window';
import { buildMockHtmlElement } from './dom-element.mock';
import { vi } from 'vitest';
import type { VComponent } from 'src/component';

let fakeTinafApp = fromPartial<TinafApp>({});
export const provideFakeTinafApp = (fakeApp: TinafApp) => {
  fakeTinafApp = fakeApp;
};

export const injectFakeTinafApp = () => fakeTinafApp;

// FIXME: use one version of fakeApp
const createFakeApp = () => createApp(() => '' as any, {} as any, {} as any);

export const setupFakeApp = ({ router }: { router: Router }) => {
  const fakeApp = createFakeApp();
  fakeApp.provide(ROUTER_PROVIDER_KEY, router);
  provideFakeTinafApp(fakeApp);
  return fakeApp;
};

export const setupFakeApp_v2 = (component: () => VComponent) => {
  const fakeDocument: IDocument = {
    getElementById: () => buildMockHtmlElement(),
    createComment: vi.fn(),
    createTextNode: vi.fn(),
  };

  const fakeWindow: IWindow = {
    attachApp: vi.fn(),
    onLoad: (callback) => callback(),
  };

  const app = new TinafApp(component, fakeWindow, fakeDocument);

  app.render('root');

  return app;
};
