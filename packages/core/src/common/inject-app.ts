import type { TinafApp } from '../render';

export function injectApp(): TinafApp {
  return window.__TINAF__;
}
