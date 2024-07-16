import type { TinafApp } from '../render';
import { fromPartial } from './from-partial';

/**
 * IMPORTANT:
 * this file has been moved out from fake-app.ts because it is imported by inject-app.
 * In dev mode, it would include Vitest code which will break the app (probably because it is not available in the browser).
 *
 */

let fakeTinafApp = fromPartial<TinafApp>({});
export const provideFakeTinafApp = (fakeApp: TinafApp) => {
  fakeTinafApp = fakeApp;
};

export const injectFakeTinafApp = () => fakeTinafApp;
