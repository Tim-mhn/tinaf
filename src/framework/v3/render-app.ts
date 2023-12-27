// import { objectEntries } from "../object";
// import { Reactive, reactive } from "../reactive";

import { render } from './render';
import { Component, DynamicComponent } from './types';

// type Component = () => {
//   renderFn: () => DomElement | Component;
//   reactive?: Reactive<any>;
//   name?: string;
// };

// type TagName = keyof HTMLElementTagNameMap;
// type Listener = Exclude<
//   {
//     [K in keyof HTMLElement]: K extends `on${infer E}` ? E : never;
//   }[keyof HTMLElement],
//   undefined
// >;

// type EventHandler = (e?: Event) => void;
// type EventHandlers = {
//   [K in Listener]?: EventHandler;
// };

// type ChildElement = string | number | DomElement | Component;
// const createElement = (tagName: TagName) => {
//   function element(
//     childOrChildren: ChildElement | ChildElement[],
//     handlers: EventHandlers = {}
//   ): DomElement {
//     const parent = document.createElement(tagName);

//     const children =
//       typeof childOrChildren === "object"
//         ? "length" in childOrChildren
//           ? childOrChildren
//           : [childOrChildren]
//         : [childOrChildren];

//     children.forEach((child) => {
//       if (typeof child === "function") render(child, parent);
//       else {
//         const formattedChild =
//           typeof child === "number" ? child.toString() : child;
//         parent.append(formattedChild);
//       }
//     });

//     const entries = objectEntries(handlers);
//     entries?.forEach((entry) => {
//       const [event, handler] = entry as [Listener, EventHandler];

//       parent.addEventListener(event, handler);
//     });

//     return parent;
//   }

//   return element;
// };

// const div = createElement("div");
// const span = createElement("span");
// const p = createElement("p");
// const button = createElement("button");

// type DomElement = HTMLElement;

// function render(cmp: Component, parent?: DomElement) {
//   console.info(`Rendering ${cmp.name}`);
//   const { reactive, renderFn } = cmp();

//   const output = renderFn();

//   if (typeof output === "function") {
//     const component = output;
//     render(component, parent);
//   } else {
//     let html = output;

//     parent?.appendChild(html);

//     reactive?.valueChanges$.subscribe(() => {
//       const newHtml = renderFn() as HTMLElement;
//       if (!parent) return;
//       const pos = getChildPosition(parent, html);
//       parent.removeChild(html);
//       insertChildAt(parent, newHtml, pos);
//       html = newHtml;
//     });
//   }
// }

// function getChildPosition(parent: HTMLElement, child: HTMLElement) {
//   return [...parent.children].findIndex((c) => c === child);
// }

// function insertChildAt(
//   parent: HTMLElement,
//   child: HTMLElement,
//   position: number
// ) {
//   if (position === 0) parent.appendChild(child);
//   else {
//     const sibling = parent.children[position + 1];
//     parent.insertBefore(sibling, child);
//   }
// }

// /**
//  * div(User)
//  * @returns
//  */

// const Counter: Component = () => {
//   const count = reactive(1);

//   const increment = () => count.update(count.value + 1);

//   const renderFn = () =>
//     div([
//       div(div(count.value)),
//       div(count.value),
//       button("Increment", { click: increment }),
//     ]);

//   //   setInterval(() => count.update(count.value + 1), 1000);

//   return {
//     renderFn,
//     reactive: count,
//     name: "Counter",
//   };
// };

// const App: Component = () => {
//   return {
//     renderFn: () => div(Counter),
//     name: "App",
//   };
// };

// mainRender();

export function renderApp(id: string, component: DynamicComponent) {
  window.addEventListener('load', () => {
    const container = document.getElementById(id) as HTMLElement;

    render(component, container);
  });
}
