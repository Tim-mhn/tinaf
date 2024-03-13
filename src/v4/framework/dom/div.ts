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

const createDomElement =
  <T extends TagName>(type: T) =>
  (...children: (Component | MaybeReactive<string>)[]) => {
    const reactiveChildren = children
      .filter(isReactive)
      .map((c) => c as ReactiveValue<string>);

    const renderFn = () => {
      const htmlElement = document.createElement(type);

      htmlElement.setAttribute('x-id', crypto.randomUUID());
      children.forEach((child) => {
        if (isComponent(child)) {
          render(child, htmlElement);
        } else {
          const textContent = toValue(child);
          htmlElement.append(textContent);
        }
      });
      return htmlElement;
    };

    const on = (eventHandlers: EventHandlers): Component => {
      const addEventListeners = (element: HTMLElement) =>
        objectEntries(eventHandlers).forEach((entry) => {
          const [event, handler] = entry as [Listener, EventHandler];
          element.addEventListener(event, handler);
        });

      return {
        renderFn: () => {
          const outputHtml = renderFn();
          addEventListeners(outputHtml);
          return outputHtml;
        },
        __isComponent: true,
        sources: reactiveChildren,
      };
    };

    return {
      renderFn,
      sources: reactiveChildren,
      __isComponent: true,
      on,
    } satisfies Component & { on: typeof on };
  };

export const div = createDomElement('div');
export const span = createDomElement('span');
export const p = createDomElement('p');
export const button = createDomElement('button');
