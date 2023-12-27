import { merge } from 'rxjs';
import { clearReactives, getReactives } from './reactive';
import { Component, DomElement, DynamicComponent } from './types';

export function render(cmp: DynamicComponent, parent?: DomElement) {
  // console.info(`Rendering ${cmp.name}`);
  const { reactives, renderFn } = cmp();

  const output = renderFn();

  if (typeof output === 'function') {
    const component = output;
    clearReactives();
    render(component, parent);
  } else {
    let html = output;

    parent?.appendChild(html);

    if (reactives && reactives?.length > 0) {
      const valueChanges$ = merge(...reactives.map((rx) => rx.valueChanges$));
      clearReactives();

      valueChanges$.subscribe(() => {
        const newHtml = renderFn() as HTMLElement;
        if (!parent) return;
        const pos = getChildPosition(parent, html);
        parent.removeChild(html);
        insertChildAt(parent, newHtml, pos);
        html = newHtml;
      });
    }
  }
}

function getChildPosition(parent: HTMLElement, child: HTMLElement) {
  return [...parent.children].findIndex((c) => c === child);
}

function insertChildAt(
  parent: HTMLElement,
  child: HTMLElement,
  position: number
) {
  if (position === 0 || position >= parent.children.length)
    parent.appendChild(child);
  else {
    const sibling = parent.children[position];
    parent.insertBefore(child, sibling);
  }
}
