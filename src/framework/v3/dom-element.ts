import { objectEntries } from './object';
import { render } from './render';
import { Component, DomElement } from './types';

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

type ElementOptions = EventHandlers & { class?: string | string[] };

const createElement = (tagName: TagName) => {
  function element(
    childOrChildren: ChildElement | ChildElement[],
    options: ElementOptions = {}
  ): DomElement {
    const parent = document.createElement(tagName);

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

    const { class: className, ...handlers } = options;

    if (className) {
      const classesAsList = formatClassesToArray(className) || [];
      try {
        parent.classList.add(...classesAsList);
      } catch (err) {
        console.error(err);
        console.log(parent);
        console.log(classesAsList);
        console.log(parent.classList);
      }
    }

    const entries = objectEntries(handlers);
    entries?.forEach((entry) => {
      const [event, handler] = entry as [Listener, EventHandler];

      parent.addEventListener(event, handler);
    });

    return parent;
  }

  return element;
};

export function formatClassesToArray(classOrClasses: string | string[]) {
  if (typeof classOrClasses === 'string') {
    const classes = classOrClasses
      .split(' ')
      .filter((cls) => cls.trim() !== '');
    return classes;
  }
  return classOrClasses;
}

export const h1 = createElement('h1');
export const h2 = createElement('h2');
export const div = createElement('div');
export const span = createElement('span');
export const p = createElement('p');
export const button = createElement('button');
