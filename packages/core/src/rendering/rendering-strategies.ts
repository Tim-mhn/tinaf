import { watchAllSources } from '../reactive/watch';
import { SimpleComponent, hasSources, render, safeRenderHtml } from '../render';

/**
 * Handles the rendering when the child of the component is an HTML element (or comment)
 * @param component
 * @param node
 * @param parent
 * @returns HTMLElement | Comment
 */
export function renderHtmlChild(
  component: SimpleComponent,
  node: HTMLElement | Comment,
  parent: HTMLElement
): HTMLElement | Comment {
  parent.append(node);

  if (hasSources(component.sources)) {
    watchAllSources(component.sources).subscribe(() => {
      console.debug('HTML  source changed');

      const index = [...parent.childNodes].findIndex((n) => n === node);
      parent.removeChild(node as HTMLElement);

      node = safeRenderHtml(component.renderFn);

      parent.insertBefore(node, [...parent.childNodes][index]);
    });
  }
  return node;
}

/**
 * Handles the rendering when the child of the component is a component itself
 * @param component
 * @param node
 * @param parent
 * @returns HTMLElement | Comment
 */
export function renderSimpleComponentChild(
  component: SimpleComponent,
  node: SimpleComponent,
  parent: HTMLElement
): HTMLElement | Comment {
  let html = render(node, parent);

  if (hasSources(component.sources)) {
    watchAllSources(component.sources).subscribe(() => {
      const index = [...parent.childNodes].findIndex((n) => n === html);
      parent.removeChild(html);
      html = safeRenderHtml(component.renderFn);
      parent.insertBefore(html, [...parent.childNodes][index]);
    });
  }

  return html;
}
