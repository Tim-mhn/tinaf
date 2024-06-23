/* eslint-disable @typescript-eslint/no-explicit-any */
import { objectEntries, objectKeys } from '../utils/object';
import { isReactive, toValue } from '../reactive/toValue';
import { type MaybeReactive, type MaybeReactiveProps } from '../reactive/types';
import { getReactiveElements } from '../reactive/utils';
import { type MaybeArray, toArray } from '../utils/array';
import { addClassToElement, mergeClasses } from './classes';
import { type AddStylesArgs, addStylesToElement } from './styles';
import { type PrimitiveType } from '../utils/primitive';
import { SimpleVComponent } from '../component/v-component';
import type { VComponent, WithHtml } from '../component/component';
import { isVComponent } from '../component/is-component';
import { watchAllSources } from '../reactive/watch';
import type { IDocument } from '../render/window';
import { buildDomDocument } from '../render/render';
import { Subscription } from 'rxjs';
import type { PartialExcept } from '../utils/partial-except';

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
  children: (VComponent | MaybeReactive<PrimitiveType>)[];
  handlers?: EventHandlers;
  classes?: AddClassesArgs;
  styles?: AddStylesArgs;
};

export class VDomComponent<T extends TagName> implements VComponent {
  constructor(
    private _doc: IDocument,
    private type: T,
    private children: (VComponent | MaybeReactive<PrimitiveType>)[],
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

  addClass(newClasses?: AddClassesArgs) {
    // TODO: mergeClasses was necessary to avoid overriding current classes
    // beware of empty array for newClasses param
    if (newClasses) this.classes = mergeClasses(newClasses, this.classes || []);
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

  private options: Partial<MaybeReactiveProps<HTMLElementTagNameMap[T]>> = {};

  withOptions(options: Partial<MaybeReactiveProps<HTMLElementTagNameMap[T]>>) {
    this.options = options;
    return this;
  }

  private _addOptionsToElement(element: HTMLElementTagNameMap[T]) {
    objectKeys(this.options).forEach((key) => {
      const value = toValue(this.options[key]);
      // FIXME: goddamn TS what do i need to do that:'|
      if (value)
        element[key as keyof HTMLElementTagNameMap[T]] =
          value as HTMLElementTagNameMap[T][keyof HTMLElementTagNameMap[T]];
    });
  }

  init(parent: WithHtml) {
    this._rerenderOnChanges(parent);

    this.children.forEach((child) => {
      if (isVComponent(child)) {
        child.init(this);
      }
    });

    this._updateOptionsReactively();
  }

  private _rerenderOnChanges(parent: WithHtml) {
    const sub = watchAllSources(this.reactiveChildren).subscribe(() => {
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      parent.html.removeChild(this.html);
      this._html = this.renderOnce();
      parent.html.insertBefore(this.html, [...parent.html.childNodes][index]);
    });

    this.sub.add(sub);
  }

  private sub = new Subscription();

  private _updateOptionsReactively() {
    const reactiveOptionsSub = new Subscription();

    objectKeys(this.options).forEach((key) => {
      const reactiveOption = this.options[key];

      if (!isReactive(reactiveOption)) return;
      const sub = reactiveOption.valueChanges$.subscribe((value) => {
        const k = key as keyof HTMLElementTagNameMap[T];
        this._html[k] =
          value as HTMLElementTagNameMap[T][keyof HTMLElementTagNameMap[T]];
      });

      reactiveOptionsSub.add(sub);
    });

    this.sub.add(reactiveOptionsSub);
  }

  renderOnce(): HTMLElementTagNameMap[T] {
    this._html = this._doc.createElement(this.type);

    this.html.setAttribute('x-id', crypto.randomUUID());
    this.children?.forEach((child) => {
      if (isVComponent(child)) {
        // NOTE: this function breaks state when rerendering a div parent with children with inner state !!

        const vchild = child as any as SimpleVComponent;
        const childrenHtml = toArray(vchild.renderOnce());
        childrenHtml.forEach((childHtml) => this.html.append(childHtml));
      } else {
        const textContent = toValue(child as MaybeReactive<any>).toString();
        this.html.append(textContent);
      }
    });

    this._addOptionsToElement(this.html);

    if (this.classes) addClassToElement(this.html, this.classes);
    if (this.handlers) addEventListenersToElement(this.html, this.handlers);
    if (this.styles) addStylesToElement(this.html, this.styles);
    return this.html;
  }

  // FIXME: destroy all children of a component is a general workflow
  // it should be re-implemented by all types of components!
  destroy() {
    this.sub.unsubscribe();
    this.children.forEach((child) => {
      if (isVComponent(child)) {
        child.destroy?.();
      }
    });
  }
  readonly __type = 'V_COMPONENT';
}
export const _createDomElement = <T extends TagName>(
  props: PartialExcept<CreateDomElementProps<T>, 'type'>,
  injections: { doc: IDocument } = {
    doc: buildDomDocument(),
  }
): VDomComponent<T> => {
  console.log(props);
  const { children = [], classes, type, handlers, styles } = props;

  const vdom = new VDomComponent(
    injections.doc,
    type,
    children,
    classes,
    styles,
    handlers
  );

  return vdom;
};
export const createDomElement =
  <T extends TagName>(type: T, injections: { doc?: IDocument } = {}) =>
  (...children: (VComponent | MaybeReactive<PrimitiveType>)[]) => {
    const doc = injections?.doc || buildDomDocument();
    return _createDomElement(
      {
        type,
        children,
      },
      { doc }
    );
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
