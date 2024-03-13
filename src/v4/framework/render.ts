import { Observable, combineLatest, skip, startWith } from 'rxjs';
import { Reactive, ReactiveValue } from './reactive/reactive';
import { MaybeReactive } from './reactive/types';
import { isReactive, toValue } from './reactive/toValue';

export interface Component {
  renderFn: () => Component | HTMLElement;
  sources?: ReactiveValue<any>[];
  __isComponent: Readonly<true>;
}

export function isHtml(node: Component | HTMLElement): node is HTMLElement {
  return !('__isComponent' in node);
}

export function isComponent(
  node: Component | MaybeReactive<any>
): node is Component {
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

export function render(component: Component, parent: HTMLElement): HTMLElement {
  const { renderFn, sources } = component;

  let node = renderFn();

  if (isHtml(node)) {
    parent.append(node);

    if (hasSources(sources)) {
      watchAllSources(sources).subscribe(() => {
        console.count('Rerendering node');
        debugger;
        const index = [...parent.childNodes].findIndex((n) => n === node);
        parent.removeChild(node as HTMLElement);
        debugger;

        node = renderFn() as HTMLElement;
        debugger;

        parent.insertBefore(node, [...parent.childNodes][index]);
        debugger;
      });
    }
    return node;
  }

  let html = render(node, parent);

  if (hasSources(sources)) {
    watchAllSources(sources).subscribe(() => {
      console.count('Rerendering component :');
      debugger;
      const index = [...parent.childNodes].findIndex((n) => n === html);
      parent.removeChild(html);
      debugger;
      html = render(node as Component, parent);
      debugger;
      parent.insertBefore(html, [...parent.childNodes][index]);
      debugger;
    });
  }

  return html;
}

export function renderApp(id: string, component: Component) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
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
