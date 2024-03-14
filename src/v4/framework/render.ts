import { Observable, combineLatest, skip, startWith } from 'rxjs';
import { Reactive, ReactiveValue, reactive } from './reactive/reactive';
import { MaybeReactive } from './reactive/types';
import { isReactive, toValue } from './reactive/toValue';
import { watchAllSources } from './reactive/watch';

export type RenderFn = () => Component | HTMLElement | null;
export interface Component {
  renderFn: RenderFn;
  sources?: ReactiveValue<any>[];
  __isComponent: Readonly<true>;
}

export function isHtmlOrComment(
  node: Component | HTMLElement | Comment
): node is HTMLElement | Comment {
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

/**
 * Renders a placeholder comment if the renderFn returns null
 * @param renderFn
 * @returns
 */
function safeRender(renderFn: RenderFn): Component | HTMLElement | Comment {
  const node = renderFn();
  if (node) return node;

  const commentText = `placeholder--${crypto.randomUUID()}`;
  const comment = document.createComment(commentText);
  return comment;
}

export function render(
  component: Component,
  parent: HTMLElement
): HTMLElement | Comment {
  const { renderFn, sources } = component;

  let node = safeRender(renderFn);

  if (isHtmlOrComment(node)) {
    parent.append(node);

    if (hasSources(sources)) {
      watchAllSources(sources).subscribe(() => {
        const index = [...parent.childNodes].findIndex((n) => n === node);
        parent.removeChild(node as HTMLElement);

        node = safeRender(renderFn) as HTMLElement | Comment;

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

export function renderApp(id: string, component: Component) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}

export const show = (cmp: Component) => {
  return {
    when: (when: MaybeReactive<boolean>) => {
      const sources = isReactive(when) ? [when] : [];

      const elseFn = (fallback: Component): Component => ({
        renderFn: () => (toValue(when) ? cmp.renderFn() : fallback.renderFn()),
        sources,
        __isComponent: true,
      });

      return {
        else: elseFn,
        renderFn: () => (toValue(when) ? cmp.renderFn() : null),
        __isComponent: true,
        sources,
      } satisfies Component & { else: typeof elseFn };
    },
  };
};
