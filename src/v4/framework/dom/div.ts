import { toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { render } from '../render';
import { Component } from '../types';

export function div(
  childOrChildren: MaybeReactive<string> | MaybeReactive<string>[]
): () => HTMLElement {
  return () => {
    const divElement = document.createElement('div');
    const id = crypto.randomUUID();
    divElement.setAttribute('x-id', id);

    const children = Array.isArray(childOrChildren)
      ? childOrChildren
      : [childOrChildren];

    children.forEach((childComponent) => {
      // render(childComponent, divElement);
      divElement.append(toValue(childComponent));
    });

    return divElement;
  };
}
