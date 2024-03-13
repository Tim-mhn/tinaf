import { Observable, combineLatest, skip, startWith } from 'rxjs';
import { Reactive, ReactiveValue } from './reactive/reactive';
import { MaybeReactive } from './reactive/types';
import { isReactive, toValue } from './reactive/toValue';

export type Component = {
  renderFn: () => Component | HTMLElement;
  sources?: ReactiveValue<any>[];
  __isComponent: Readonly<true>;
};

function isHtml(node: Component | HTMLElement): node is HTMLElement {
  return !('__isComponent' in node);
}

function isComponent(node: Component | MaybeReactive<any>): node is Component {
  try {
    return node && typeof node === 'object' && '__isComponent' in node;
  } catch (err) {
    throw new Error(`Cannot use 'in' in isComponent for node: ${node}`);
  }
}

function hasSources(
  sources?: ReactiveValue<any>[]
): sources is ReactiveValue<any>[] {
  return !!sources && sources.length > 0;
}

function watchAllSources(sources: ReactiveValue<any>[]) {
  return combineLatest(
    sources.map((s) => s.valueChanges$.pipe(startWith('')))
  ).pipe(skip(1));
}

function render(component: Component, parent: HTMLElement): HTMLElement {
  const { renderFn, sources } = component;

  let node = renderFn();

  if (isHtml(node)) {
    parent.append(node);

    if (hasSources(sources)) {
      watchAllSources(sources).subscribe(() => {
        const index = [...parent.childNodes].findIndex((n) => n === node);
        parent.removeChild(node as HTMLElement);
        node = renderFn() as HTMLElement;
        parent.insertBefore(node, [...parent.childNodes][index]);
      });
    }
    return node;
  }

  let html = render(node, parent);

  if (hasSources(sources)) {
    watchAllSources(sources).subscribe(() => {
      const index = [...parent.childNodes].findIndex((n) => n === html);
      parent.removeChild(html);
      html = render(node as Component, parent);
      parent.insertBefore(html, [...parent.childNodes][index]);
    });
  }

  return html;
}

export function renderAppV4_2(id: string, component: Component) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}
export function div(
  ...children: (Component | MaybeReactive<string>)[]
): Component {
  const reactiveChildren = children
    .filter(isReactive)
    .map((c) => c as ReactiveValue<string>);

  return {
    renderFn: () => {
      const htmlElement = document.createElement('div');
      htmlElement.setAttribute('x-id', crypto.randomUUID());
      children.forEach((child) => {
        if (isComponent(child)) {
          render(child, htmlElement);
        } else {
          const textContent = toValue(child);
          htmlElement.append(textContent);
        }
      });
      return htmlElement;
    },
    sources: reactiveChildren,
    __isComponent: true,
  };
}

export function component(fn: () => HTMLElement | Component): Component {
  return {
    renderFn: fn,
    __isComponent: true,
  };
}

export const show = (cmp: Component) => {
  return {
    when: (when: MaybeReactive<boolean>) => {
      return {
        else: (fallback: Component): Component => ({
          renderFn: () =>
            toValue(when) ? cmp.renderFn() : fallback.renderFn(),
          sources: isReactive(when) ? [when] : [],
          __isComponent: true,
        }),
      };
    },
  };
};
