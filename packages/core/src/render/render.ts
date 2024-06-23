/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactiveValue } from '../reactive/reactive';
import { type MaybeReactive } from '../reactive/types';
import { type PrimitiveType, isPrimitive } from '../utils/primitive';
import { type VComponent } from '../component/component';
import { type MaybeArray, toArray } from '../utils/array';
import type { IDocument, IWindow } from './window';
import { TinafApp } from './app';

export type RenderFn = () =>
  | SimpleComponent
  | HTMLElement
  | null
  | PrimitiveType;

export type SimpleComponent = {
  renderFn: RenderFn;
  __type: 'component';
  sources?: ReactiveValue<any>[];
};

export type ForLoopComponent<T> = {
  __type: 'for-loop';
  items: MaybeReactive<T[]>;
  componentFn: (item: T) => SimpleComponent;
};

export type Component<T = any> = SimpleComponent | ForLoopComponent<T>;

export function isHtmlOrComment(
  node: Component | HTMLElement | Comment
): node is HTMLElement | Comment {
  return !('__type' in node);
}

export function isComponent(
  node: Component | HTMLElement | Comment | MaybeReactive<any>
): node is Component {
  return node && typeof node === 'object' && '__type' in node;
}
export function isSimpleComponent(
  node: Component | MaybeReactive<any>
): node is SimpleComponent {
  try {
    return isComponent(node) && node['__type'] === 'component';
  } catch (err) {
    throw new Error(`Cannot use 'in' in isSimpleComponent for node: ${node}`);
  }
}

export function isForLoopComponent(
  node: Component | HTMLElement | Comment | MaybeReactive<any>
): node is ForLoopComponent<any> {
  return isComponent(node) && node['__type'] === 'for-loop';
}

export function hasSources(
  sources?: ReactiveValue<any>[]
): sources is ReactiveValue<any>[] {
  return !!sources && sources.length > 0;
}

export function render(
  component: VComponent,
  parent: HTMLElement
): MaybeArray<HTMLElement | Comment> {
  component.init({ html: parent });
  const html = component.renderOnce();
  parent.append(...toArray(html));
  return html;
}

/**
 * @deprecated Use createApp instead
 * @param id
 * @param component
 */
export function renderApp(id: string, component: VComponent) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}
declare global {
  interface Window {
    __TINAF__: TinafApp;
  }
}

export function createApp(
  app: () => VComponent,
  _window?: IWindow,
  _doc?: IDocument
) {
  const win = _window || buildDomWindow();
  const doc = _doc || buildDomDocument();
  return new TinafApp(app, win, doc);
}

export const buildDomDocument = (): IDocument => {
  return document;
};

export const buildDomWindow = (): IWindow => {
  return {
    attachApp(app: TinafApp) {
      window.__TINAF__ = app;
    },
    onLoad(callback: () => void) {
      window.addEventListener('load', callback);
    },
  };
};
