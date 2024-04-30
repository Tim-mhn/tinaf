import { objectEntries } from '../utils/object';
import { toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { getReactiveElements } from '../reactive/utils';
import { MaybeArray } from '../utils/array';
import { addClassToElement } from './classes';
import { AddStylesArgs, addStylesToElement } from './styles';
import { PrimitiveType } from '../utils/primitive';
import { VComponent } from '../component/wip/v-component.v2';
import { ComponentV2, WithHtml } from '../component/wip/component';
import { isV2Component } from '../component/wip/isComponent';
import { watchAllSources } from '../reactive/watch';
import { ReactiveValue } from '../reactive';
import { Observable, tap } from 'rxjs';

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

export type AddClassesArgs =
  | MaybeArray<MaybeReactive<string>>
  | Record<string, MaybeReactive<boolean>>;

type CreateDomElementProps<T extends TagName> = {
  type: T;
  children: (ComponentV2 | MaybeReactive<PrimitiveType>)[];
  handlers?: EventHandlers;
  classes?: AddClassesArgs;
  styles?: AddStylesArgs;
};

export class VDomComponent<T extends TagName> implements ComponentV2 {
  constructor(
    private type: T,
    private children: (ComponentV2 | MaybeReactive<PrimitiveType>)[],
    private classes?: AddClassesArgs,
    private styles?: AddStylesArgs,
    private handlers?: EventHandlers
  ) {}

  private _html!: HTMLElementTagNameMap[T];

  get html() {
    return this._html;
  }

  private get reactiveChildren() {
    return getReactiveElements(this.children);
  }

  addClass(newClasses: AddClassesArgs) {
    this.classes = newClasses;
    return this;
  }

  addStyles(newStyles: AddStylesArgs) {
    this.styles = newStyles;
    return this;
  }

  on(newEventHandlers: EventHandlers) {
    this.handlers = newEventHandlers;
    return this;
  }

  init(parent: WithHtml) {
    watchAllSources(this.reactiveChildren).subscribe(() => {
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      parent.html.removeChild(this.html);
      this._html = this.renderOnce();
      parent.html.insertBefore(this.html, [...parent.html.childNodes][index]);
    });
    this.children.forEach((child) => {
      if (isV2Component(child)) {
        child.init(this);
      }
    });
  }

  renderOnce(): HTMLElementTagNameMap[T] {
    this._html = document.createElement(this.type);

    this.html.setAttribute('x-id', crypto.randomUUID());
    console.group('renderOnce');
    console.log(this.type);
    console.log({ children: this.children });
    console.groupEnd();
    this.children?.forEach((child) => {
      if (isV2Component(child)) {
        // NOTE: this function breaks state when rerendering a div parent with children with inner state !!

        const vchild = child as any as VComponent;
        const childHtml = vchild.renderOnce();
        this.html.append(childHtml);
      } else {
        const textContent = toValue(child as MaybeReactive<any>).toString();
        this.html.append(textContent);
      }
    });

    if (this.classes) addClassToElement(this.html, this.classes);
    if (this.handlers) addEventListenersToElement(this.html, this.handlers);
    if (this.styles) addStylesToElement(this.html, this.styles);
    return this.html;
  }
  readonly __type = 'componentV2';
}
const _createDomElement = <T extends TagName>(
  props: CreateDomElementProps<T>
): VDomComponent<T> => {
  const { children, classes, type, handlers, styles } = props;

  const vdom = new VDomComponent(type, children, classes, styles, handlers);

  return vdom;
};
export const createDomElement =
  <T extends TagName>(type: T) =>
  (...children: (ComponentV2 | MaybeReactive<PrimitiveType>)[]) => {
    return _createDomElement({
      type,
      children,
    });
  };

export const addEventListenersToElement = (
  element: HTMLElement,
  handlers: EventHandlers
) => {
  objectEntries(handlers).forEach((entry) => {
    const [event, handler] = entry as [Listener, EventHandler];
    element.addEventListener(event, handler);
  });
};
