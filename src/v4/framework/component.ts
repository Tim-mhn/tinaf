import { Component } from './render';

export function component(fn: () => HTMLElement | Component): Component {
  return {
    renderFn: fn,
    __isComponent: true,
  };
}
