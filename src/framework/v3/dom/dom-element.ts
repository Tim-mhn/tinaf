import { createCssRule } from '../css';
import { objectEntries } from '../object';
import { render } from '../render';
import { Component, DomElement } from '../types';
import { randomId } from '../utils/random';

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

type ChildElement = string | number | DomElement | Component | false;

type ElementOptions = EventHandlers & {
  class?: string | string[];
  styles?: CustomStyles;
};

export const createElement = <T extends TagName>(tagName: T) => {
  function element(
    childOrChildren?: ChildElement | ChildElement[],
    options: ElementOptions = {}
  ): HTMLElementTagNameMap[T] {
    const parent = document.createElement(tagName);

    const { xId } = setIdentifierToElement(parent);

    addChildrenToElement(parent, childOrChildren);

    const { class: className, styles, ...handlers } = options;

    addClassesToElement(parent, options.class);

    addEventListenersToElement(parent, handlers);
    addCustomStylesToElement(xId, styles);

    return parent;
  }

  return element;
};

function setIdentifierToElement(element: HTMLElement) {
  const xId = randomId();
  element.setAttribute('x-id', xId);
  return { xId };
}

function addEventListenersToElement(
  element: HTMLElement,
  handlers: EventHandlers
) {
  const entries = objectEntries(handlers);
  entries?.forEach((entry) => {
    const [event, handler] = entry as [Listener, EventHandler];

    try {
      element.addEventListener(event, handler);
    } catch (err) {
      console.error(`Error when adding listener on "${event}" event`);
    }
  });
}

function addClassesToElement(
  element: HTMLElement,
  className?: ElementOptions['class']
) {
  if (!className) return;

  const classesAsList = formatClassesToArray(className) || [];
  try {
    element.classList.add(...classesAsList);
  } catch (err) {
    console.error(err);
  }
}

function addChildrenToElement(
  parent: HTMLElement,
  childOrChildren?: ChildElement | ChildElement[]
) {
  if (!childOrChildren) return;

  const children =
    typeof childOrChildren === 'object'
      ? 'length' in childOrChildren
        ? childOrChildren
        : [childOrChildren]
      : [childOrChildren];

  children
    .filter((child) => child !== false)
    .map((child) => child as Exclude<ChildElement, false>)
    .forEach((child) => {
      if (typeof child === 'function') render(child, parent);
      else {
        const formattedChild =
          typeof child === 'number' ? child.toString() : child;
        parent.append(formattedChild);
      }
    });
}
export function formatClassesToArray(classOrClasses: string | string[]) {
  if (typeof classOrClasses === 'string') {
    const classes = classOrClasses
      .split(' ')
      .filter((cls) => cls.trim() !== '');
    return classes;
  }
  return classOrClasses;
}

export type CustomStyles = { disabled: Record<string, string> };
function addCustomStylesToElement(xId: string, styles?: CustomStyles) {
  if (styles)
    createCssRule(
      {
        attribute: 'x-id',
        attributeValue: xId,
        elementTag: 'button',
        pseudoSelector: 'disabled',
      },
      styles.disabled
    );
}

export const h1 = createElement('h1');
export const h2 = createElement('h2');
export const div = createElement('div');
export const span = createElement('span');
export const p = createElement('p');

export { button } from './button';
