import {
  injectFakeTinafApp,
  provideFakeTinafApp,
} from '../test-utils/fake-app';
import type { TinafApp } from '../render';

export function injectApp(): TinafApp {
  if (process.env.NODE_ENV === 'test') {
    console.debug('Injecting fake tinaf app');
    return injectFakeTinafApp();
  }
  return window.__TINAF__;
}

export function provideApp(app: TinafApp) {
  if (process.env.NODE_ENV === 'test') {
    provideFakeTinafApp(app);
    return;
  }

  window.__TINAF__ = app;
}
