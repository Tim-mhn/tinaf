import { concatMap } from 'rxjs';
import { div } from './dom/div';
import { Reactive, ReactiveValue } from './reactive/reactive';
import { MaybeReactive } from './reactive/types';
import { Component } from './types';
import { component, component } from './component';

function isReactive<T extends string | number | boolean>(
  component: MaybeReactive<T>
): component is Reactive<T> {
  return typeof component !== 'number' && typeof component !== 'string';
}

function toValue<T extends string | number | boolean>(
  maybeReactive: MaybeReactive<T>
): T {
  return isReactive(maybeReactive) ? maybeReactive.value : (maybeReactive as T);
}

function getComponentHtmlContent(component: Component) {
  if (typeof component === 'function')
    return {
      content: component(),
    };

  return isReactive(component)
    ? {
        content: component.value.toString(),
      }
    : {
        content: component.toString(),
      };
}
function renderOnce(component: Component, parent: HTMLElement) {
  const { content } = getComponentHtmlContent(component);
  parent.append(content);
}

function rerenderOnChanges<T extends string | number | boolean>(
  rx: Reactive<T>,
  parent: HTMLElement
) {
  let nodeContent = toValue(rx).toString();
  rx.valueChanges$.subscribe((newValue) => {
    console.count('rerendering');
    const childNode = [...parent.childNodes].find(
      (n) => n.textContent === nodeContent
    );
    if (!childNode)
      throw new Error(
        `Could not find child node with textContent ${nodeContent}`
      );

    nodeContent = newValue.toString();

    parent.removeChild(childNode);
    parent.append(nodeContent);
  });
}
export function render(
  componentOutput: ReturnType<typeof component>,
  parent: HTMLElement
) {
  renderOnce(component, parent);

  const isReactiveValue =
    typeof component !== 'function' && isReactive(component);

  if (isReactiveValue) rerenderOnChanges(component, parent);
}

export function renderApp(
  id: string,
  componentFn: ReturnType<typeof component>
) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(componentFn(), container);
  });
}

export function ifTrue(condition: MaybeReactive<boolean>) {
  return toValue(condition);
}
