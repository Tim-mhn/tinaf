import { objectEntries } from '../utils/object';
import { isReactive, toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { getReactiveElements } from '../reactive/utils';
import { Component, isComponent, render } from '../render';
import { MaybeArray, toArray } from '../utils/array';
import { addClassToElement } from './classes';
import { AddStylesArgs, addStylesToElement } from './styles';

type TagName = keyof HTMLElementTagNameMap;

type PrimitiveType = string | boolean | number;
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

export type AddClassesArgs = MaybeArray<MaybeReactive<string>>;

type CreateDomElementProps<T extends TagName> = {
  type: T;
  children: (Component | MaybeReactive<PrimitiveType>)[];
  handlers?: EventHandlers;
  classes?: AddClassesArgs;
  styles?: AddStylesArgs;
};

const _createDomElement = <T extends TagName>(
  props: CreateDomElementProps<T>
): Component & {
  on: typeof on;
  addClass: typeof addClass;
  addStyles: typeof addStyles;
} => {
  const { children, classes, type, handlers, styles } = props;
  const reactiveChildren = getReactiveElements(children);

  const renderFn = () => {
    const htmlElement = document.createElement(type);

    htmlElement.setAttribute('x-id', crypto.randomUUID());
    children?.forEach((child) => {
      if (isComponent(child)) {
        render(child, htmlElement);
      } else {
        const textContent = toValue(child).toString();
        htmlElement.append(textContent);
      }
    });

    if (classes) addClassToElement(htmlElement, classes);
    if (handlers) addEventListenersToElement(htmlElement, handlers);
    if (styles) addStylesToElement(htmlElement, styles);
    return htmlElement;
  };

  const on = (_handlers: EventHandlers) => {
    const allHandlers = {
      ...(handlers || {}),
      ..._handlers,
    };

    return _createDomElement({
      ...props,
      handlers: allHandlers,
    });
  };

  const addClass = (newClasses: AddClassesArgs) => {
    return _createDomElement({
      ...props,
      classes: newClasses,
    });
  };

  const addStyles = (newStyles: AddStylesArgs) => {
    return _createDomElement({
      ...props,
      styles: newStyles,
    });
  };

  return {
    __isComponent: true,
    renderFn,
    on,
    addClass,
    addStyles,
    sources: reactiveChildren,
  };
};
export const createDomElement =
  <T extends TagName>(type: T) =>
  (...children: (Component | MaybeReactive<PrimitiveType>)[]) => {
    return _createDomElement({
      type,
      children,
    });
  };

const addEventListenersToElement = (
  element: HTMLElement,
  handlers: EventHandlers
) => {
  objectEntries(handlers).forEach((entry) => {
    const [event, handler] = entry as [Listener, EventHandler];
    element.addEventListener(event, handler);
  });
};
