import { objectEntries } from '../../../framework/v3/object';
import { ReactiveValue } from '../reactive/reactive';
import { isReactive, toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { Component, isComponent, render } from '../render';

type TagName = keyof HTMLElementTagNameMap;

type Listener = Exclude<
  {
    [K in keyof HTMLElement]: K extends `on${infer E}` ? E : never;
  }[keyof HTMLElement],
  undefined
>;

type EventHandler = (e?: Event) => void;
export type EventHandlers = {
  [K in Listener]?: EventHandler;
};

const _createDomElement = <T extends TagName>({
  type,
  children,
  handlers,
  classes,
}: {
  type: T;
  children: (Component | MaybeReactive<string>)[];
  handlers?: EventHandlers;
  classes?: string | string[];
}): Component & { on: typeof on; addClass: typeof addClass } => {
  const reactiveChildren = children
    ?.filter(isReactive)
    .map((c) => c as ReactiveValue<string>);

  const renderFn = () => {
    const htmlElement = document.createElement(type);

    htmlElement.setAttribute('x-id', crypto.randomUUID());
    children?.forEach((child) => {
      if (isComponent(child)) {
        render(child, htmlElement);
      } else {
        const textContent = toValue(child);
        htmlElement.append(textContent);
      }
    });

    if (classes) addClassToElement(htmlElement, classes);
    if (handlers) addEventListenersToElement(htmlElement, handlers);
    return htmlElement;
  };

  const on = (_handlers: EventHandlers) => {
    const allHandlers = {
      ...(handlers || {}),
      ..._handlers,
    };

    return _createDomElement({
      type,
      children,
      classes,
      handlers: allHandlers,
    });
  };

  const addClass = (newClasses: string | string[]) => {
    // merge previous classes ??
    return _createDomElement({
      type,
      children,
      classes: newClasses,
      handlers,
    });
  };

  return {
    __isComponent: true,
    renderFn,
    on,
    addClass,
    sources: reactiveChildren,
  };
};
const createDomElement =
  <T extends TagName>(type: T) =>
  (...children: (Component | MaybeReactive<string>)[]) => {
    return _createDomElement({
      type,
      children,
    });
  };
function formatClassesToArray(classOrClasses: string | string[]) {
  if (typeof classOrClasses === 'string') {
    const classes = classOrClasses
      .split(' ')
      .filter((cls) => cls.trim() !== '');
    return classes;
  }
  return classOrClasses;
}

const addEventListenersToElement = (
  element: HTMLElement,
  handlers: EventHandlers
) => {
  objectEntries(handlers).forEach((entry) => {
    const [event, handler] = entry as [Listener, EventHandler];
    element.addEventListener(event, handler);
  });
};

const addClassToElement = (
  element: HTMLElement,
  classes: string | string[]
) => {
  const classNames = formatClassesToArray(classes);
  element.classList.add(...classNames);
};

export const div = createDomElement('div');
export const span = createDomElement('span');
export const p = createDomElement('p');
export const button = createDomElement('button');
