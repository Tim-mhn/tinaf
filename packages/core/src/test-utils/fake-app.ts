/* eslint-disable @typescript-eslint/no-explicit-any */
import { TinafApp, createApp } from '../render';
import { ROUTER_PROVIDER_KEY, type Router } from '../router';
import type { IDocument } from '../render/window';
import { createFakeElement } from './dom-element.mock';
import { vi } from 'vitest';
import type { VComponent } from '../component';
import { FakeWindow } from './fake-window';
import { provideFakeTinafApp } from './inject-app.mock';
import { buildTestRouter } from '../router/test-utils';

// // FIXME: use one version of fakeApp
const createFakeApp = () => createApp(() => '' as any, {} as any, {} as any);

export const createMockDocument = (): IDocument => ({
  getElementById: vi.fn(createFakeElement),
  createComment: vi.fn(),
  createTextNode: vi.fn(createFakeTextNode),
  createElement: vi.fn(createFakeElement),
});

// @ts-expect-error just for mock test data
const createFakeTextNode = (): Text => ({});
export const setupFakeApp = ({
  router = buildTestRouter([]),
}: { router?: Router } = {}) => {
  const fakeApp = createFakeApp();
  fakeApp.provide(ROUTER_PROVIDER_KEY, router);
  provideFakeTinafApp(fakeApp);
  return fakeApp;
};

export const setupFakeApp_v2 = (
  component: () => VComponent,
  injections: { document: IDocument } = {
    document: createMockDocument(),
  }
) => {
  const fakeWindow = new FakeWindow();

  const app = new TinafApp(component, fakeWindow, injections.document);

  app.render('root');

  fakeWindow.load();

  return { app, document: injections.document, fakeWindow };
};
