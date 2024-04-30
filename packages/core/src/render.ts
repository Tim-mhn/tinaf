import { ReactiveValue } from './reactive/reactive';
import { MaybeReactive } from './reactive/types';
import { watchAllSources } from './reactive/watch';
import { forLoopRender } from './component/for-loop';
import { isReactive, toValue } from './reactive';
import { watchList } from './reactive/watch-list';
import { PrimitiveType, isPrimitive } from './utils/primitive';
import {
  renderHtmlChild,
  renderSimpleComponentChild,
} from './rendering/rendering-strategies';
import { VComponent } from './component/wip/v-component.v2';
import { ComponentV2 } from './component/wip/component';
import { isV2Component } from './component/wip/isComponent';

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

/**
 * Recursive function to return the HTML element (or placeholder comment) from a renderFn
 * This does not update the DOM or create any subscriptions
 * @param renderFn
 * @returns
 */
export function safeRenderHtml(renderFn: RenderFn): HTMLElement | Comment {
  const htmlComponentOrComment = safeRenderHtmlOrComponent(renderFn);

  if (isHtmlOrComment(htmlComponentOrComment)) return htmlComponentOrComment;

  return safeRenderHtml(htmlComponentOrComment.renderFn);
}

/**
 * Returns a placeholder comment if the renderFn returns null (when using a show.when structure)
 * @param renderFn
 * @returns
 */
export function safeRenderHtmlOrComponent(
  renderFn: RenderFn
): SimpleComponent | HTMLElement | Comment {
  const node = renderFn();

  if (!node) return buildPlaceholderComment();

  if (isPrimitive(node)) return document.createTextNode(node.toString());

  return node;
}

function buildPlaceholderComment() {
  const commentText = `placeholder--${crypto.randomUUID()}`;
  const comment = document.createComment(commentText);
  return comment;
}

export function render(
  component: ComponentV2,
  parent: HTMLElement
): HTMLElement | Comment {
  if (isForLoopComponent(component)) {
    renderForLoop(component as any, parent);
    return buildPlaceholderComment();
  }

  if (isV2Component(component)) {
    console.info('Calling init from render');
    (component as VComponent).init({ html: parent });
    const html = (component as VComponent).renderOnce();
    parent.append(html);
    return html;
  }

  throw new Error('pathway not supported in render function');

  const { renderFn } = component;

  let node = safeRenderHtmlOrComponent(renderFn);

  if (isHtmlOrComment(node)) {
    return renderHtmlChild(component, node, parent);
  }

  return renderSimpleComponentChild(component, node, parent);
}

function renderForLoop<T>(
  component: ReturnType<typeof forLoopRender<T>>,
  parent: HTMLElement
) {
  const { componentFn, items } = component;

  const children = toValue(items).map((i) =>
    safeRenderHtml(componentFn(i).renderFn)
  );
  parent.append(...children);

  if (!isReactive(items)) return parent;

  watchList(items).subscribe((changes) => {
    const childrenToRemove = changes
      .filter(({ change }) => change === 'removed')
      .map(({ index, value }) => {
        console.debug('Removing child ', value);
        return parent.childNodes[index];
      });

    childrenToRemove.forEach((child) => parent.removeChild(child));

    const childrenToAdd = changes
      .filter(({ change }) => change === 'added')
      .sort((a, b) => b.index - a.index);

    childrenToAdd.forEach(({ value, index }) => {
      const child = safeRenderHtml(componentFn(value).renderFn);
      console.debug('Adding child ', value);
      parent.insertBefore(child, [...parent.childNodes][index]);
    });
  });

  return parent;
}

export function renderApp(id: string, component: ComponentV2) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}
