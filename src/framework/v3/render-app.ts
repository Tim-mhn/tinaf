import { render } from './render';
import { Component, DynamicComponent } from './types';

export function renderApp(id: string, component: DynamicComponent) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}
