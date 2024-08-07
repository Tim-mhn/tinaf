/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeClasses } from '../dom/classes';
import type {
  AddClassesArgs,
  ComponentChildren,
} from '../dom/create-dom-element';
import { type MaybeReactive } from '../reactive';
import { toArray, type MaybeArray } from '../utils/array';
import { type TinafElement, type VComponent, type WithHtml } from './component';
import { isVComponent } from './is-component';
import {
  popLastOnDestroyCallback,
  popLastOnInitCallback,
} from './lifecycle-hooks';

export class SimpleVComponent<Props extends ComponentProps = NoProps>
  implements VComponent
{
  constructor(
    private props: RenderFnParams<Props>,
    public renderFn: (props: RenderFnParams<Props>) => TinafElement
  ) {}

  readonly __type = 'V_COMPONENT';
  readonly __subtype = 'V3';

  child!: TinafElement;
  html!: MaybeArray<HTMLElement | Comment>;
  parent!: WithHtml;

  private parentClasses?: AddClassesArgs;
  addClass(newClass?: AddClassesArgs) {
    if (!newClass) return this;
    this.parentClasses = newClass;
    return this;
  }

  /**
   * union of classes between 'className' prop and parent propagating classes to nearest child DOM element
   */
  private get classesUnion() {
    // TODO: we added ? to this.props because props is sometimes undefined. But why ? this.props should be an empty object at least
    return mergeClasses(this.parentClasses || [], this.props?.className || []);
  }

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn(this.props);

    this._registerOnDestroyCallback();

    this.children.forEach((child) => {
      if (isVComponent(child)) {
        child.init(this.parent);
        child.addClass(this.classesUnion);
      }
    });

    this._executeOnInitCallback();
  }

  private _executeOnInitCallback() {
    const lastOnInitCallback = popLastOnInitCallback();
    if (lastOnInitCallback) lastOnInitCallback();
  }

  private onDestroyCallback: () => void = () => undefined;

  private _registerOnDestroyCallback() {
    const lastOnDestroyCallback = popLastOnDestroyCallback();
    if (lastOnDestroyCallback) this.onDestroyCallback = lastOnDestroyCallback;
  }

  private get children() {
    return toArray(this.child);
  }
  renderOnce(): MaybeArray<HTMLElement | Comment> {
    const newHtml = this.children.map((child) => {
      if (isVComponent(child)) {
        return child.renderOnce();
      }

      return child;
    });

    this.html = newHtml.flat();

    return this.html;
  }

  destroy(): void {
    this.onDestroyCallback();

    if (isVComponent(this.child)) {
      this.child.destroy?.();
    }
  }
}

export type ComponentFn<Props extends ComponentProps = NoProps> = ReturnType<
  typeof component<Props>
>;

export function component<Props extends ComponentProps = NoProps>(
  renderFn: (p: RenderFnParams<Props>) => TinafElement
) {
  return (extendedProps: RenderFnParams<Props & { className?: string }>) => {
    return new SimpleVComponent(extendedProps, renderFn);
  };
}

type NoProps = Record<string, never>;
type DefaultComponentProps = {
  children?: ComponentChildren;
  className?: AddClassesArgs;
};

type RenderFnParams<Props extends object> = Props extends NoProps
  ? DefaultComponentProps
  : DefaultComponentProps & {
      [K in keyof Omit<Props, 'children'>]: Props[K] extends (
        ...args: any[]
      ) => any
        ? Props[K]
        : MaybeReactive<Props[K]>;
    };

type ComponentProps = {
  [key: string]: any;
} & {
  children?: never;
};
