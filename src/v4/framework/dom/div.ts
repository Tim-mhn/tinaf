import { objectEntries } from '../../../framework/v3/object';
import { ReactiveValue } from '../reactive/reactive';
import { isReactive, toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { getReactiveElements } from '../reactive/utils';
import { watchAllSources } from '../reactive/watch';
import { Component, isComponent, render } from '../render';
import { MaybeArray, toArray } from '../utils/array';
import { formatClassesToArray } from './classes';

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

type AddClassesArgs = MaybeArray<MaybeReactive<string>>;

const _createDomElement = <T extends TagName>({
  type,
  children,
  handlers,
  classes,
}: {
  type: T;
  children: (Component | MaybeReactive<PrimitiveType>)[];
  handlers?: EventHandlers;
  classes?: AddClassesArgs;
}): Component & { on: typeof on; addClass: typeof addClass } => {
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

  const addClass = (newClasses: AddClassesArgs) => {
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

function getFormattedClasses(classes: AddClassesArgs) {
  const classesArr = toArray(classes);
  const reactiveClasses = getReactiveElements(classesArr);

  const stringClasses = classesArr.map(toValue);
  let formattedClasses = formatClassesToArray(stringClasses);
  return formattedClasses;
}

function addClassToElement(element: HTMLElement, classes: AddClassesArgs) {
  const classesArr = toArray(classes);
  const reactiveClasses = getReactiveElements(classesArr);

  let formattedClasses = getFormattedClasses(classes);
  element.classList.add(...formattedClasses);

  watchAllSources(reactiveClasses).subscribe(() => {
    element.className = '';
    const newFormattedClasses = getFormattedClasses(classes);
    element.classList.add(...newFormattedClasses);
  });
}

export const div = createDomElement('div');
export const span = createDomElement('span');
export const p = createDomElement('p');
export const button = createDomElement('button');
