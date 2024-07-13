// this is common behaviour for <Foo /> and <Show />

import type { HTML, TinafElement, WithHtml } from '../component/component';
import { isVComponent } from '../component/is-component';
import { toArray, type MaybeArray } from '../utils/array';

// maybe we should reuse the same function (or even create a class ?) to handle this behaviour
export function renderChildren(children: MaybeArray<TinafElement>): HTML[] {
  return toArray(children)
    .map((child) => {
      if (isVComponent(child)) {
        return child.renderOnce();
      }

      return child;
    })
    .flat();
}

export function initChildren(
  children: MaybeArray<TinafElement>,
  parent: WithHtml
): void {
  toArray(children).forEach((child) => {
    if (isVComponent(child)) {
      child.init(parent);
    }
  });
}

export function destroyChildren(children: MaybeArray<TinafElement>): void {
  toArray(children).forEach((child) => {
    if (isVComponent(child)) {
      child.destroy?.();
    }
  });
}
