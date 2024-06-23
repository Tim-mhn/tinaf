/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeClasses } from '../dom/classes';
import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeReactive } from '../reactive';
import { type MaybeArray } from '../utils/array';
import { type TinafElement, type VComponent, type WithHtml } from './component';
import { isVComponent } from './is-component';
import {
  popLastOnDestroyCallback,
  popLastOnInitCallback,
} from './lifecycle-hooks';

/**
 * @deprecated use SimpleVComponent_v2 instead
 */
export class SimpleVComponent<Props extends ComponentProps = NoProps>
  implements VComponent
{
  constructor(
    private props: RenderFnInputParams<Props>,
    public renderFn: (
      ...params: RenderFnParams<Props>
    ) => HTMLElement | Comment | VComponent
  ) {}

  readonly __type = 'V_COMPONENT';

  child!: HTMLElement | Comment | VComponent;
  html!: MaybeArray<HTMLElement | Comment>;
  parent!: WithHtml;

  private get renderFnParamsWithChildren() {
    const params: RenderFnParams<Props> = (this.props || []).map(
      ({ children, ...p }) => {
        return {
          ...p,
          children:
            children ||
            ([] satisfies RenderFnParams<Props>[number]['children']),
        };
      }
    ) as RenderFnParams<Props>;

    return params;
  }

  private classes?: AddClassesArgs;
  addClass(newClass?: AddClassesArgs) {
    if (!newClass) return this;
    this.classes = newClass;
    return this;
  }

  private onDestroyCallback: () => void = () => undefined;

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn(...this.renderFnParamsWithChildren);

    this._registerOnDestroyCallback();

    if (isVComponent(this.child)) {
      debugger;
      this.child.init(this.parent);
      this.child.addClass(this.classes);
    } else {
      this.html = this.child;
    }

    this._executeOnInitCallback();
  }

  private _executeOnInitCallback() {
    const lastOnInitCallback = popLastOnInitCallback();
    if (lastOnInitCallback) lastOnInitCallback();
  }

  private _registerOnDestroyCallback() {
    const lastOnDestroyCallback = popLastOnDestroyCallback();
    if (lastOnDestroyCallback) this.onDestroyCallback = lastOnDestroyCallback;
  }

  renderOnce(): MaybeArray<HTMLElement | Comment> {
    if (isVComponent(this.child)) {
      const html = this.child.renderOnce();
      this.html = html;
      return html;
    }

    return this.child;
  }

  destroy(): void {
    this.onDestroyCallback();

    if (isVComponent(this.child)) {
      this.child.destroy?.();
    }
  }
}

class SimpleVComponent_v2<Props extends ComponentProps = NoProps>
  implements VComponent
{
  constructor(
    private props: _RenderFnParams<Props & { className?: AddClassesArgs }>,
    public renderFn: (
      props: _RenderFnParams<Props & { className?: AddClassesArgs }>
    ) => TinafElement
  ) {
    console.log(props);
  }

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

    if (isVComponent(this.child)) {
      this.child.init(this.parent);
      this.child.addClass(this.classesUnion);
    } else {
      this.html = this.child;
    }

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

  renderOnce(): MaybeArray<HTMLElement | Comment> {
    if (isVComponent(this.child)) {
      const html = this.child.renderOnce();
      this.html = html;
      return html;
    }

    return this.child;
  }

  destroy(): void {
    this.onDestroyCallback();

    if (isVComponent(this.child)) {
      this.child.destroy?.();
    }
  }
}

export type ComponentFn = ReturnType<typeof component>;

/**
 * @deprecated use componentV2 instead
 * @param renderFn
 * @returns
 */
export function component<Props extends ComponentProps = NoProps>(
  renderFn: (
    ...params: RenderFnParams<Props>
  ) => HTMLElement | Comment | VComponent
) {
  return (...propsParams: RenderFnInputParams<Props>) =>
    new SimpleVComponent(propsParams, renderFn);
}

// NOTE: componentV2 is a temporary solution to allow for className prop and make it easier to use in JSX
export function componentV2<Props extends ComponentProps = NoProps>(
  renderFn: (p: _RenderFnParams<Props>) => HTMLElement | Comment | VComponent
) {
  return (extendedProps: _RenderFnParams<Props & { className?: string }>) => {
    return new SimpleVComponent_v2(extendedProps, renderFn);
  };
}

// This is like RenderFnParams but children are optional
type RenderFnInputParams<Props extends ComponentProps> = Props extends NoProps
  ? [] | [{ children: (VComponent | string)[] | string }]
  : [_RenderFnParams<Props>];

type NoProps = Record<string, never>;

type RenderFnParams<Props extends ComponentProps> = Props extends NoProps
  ? [{ children: (VComponent | string)[] | string }]
  : [_RenderFnParams<Props>];

type _RenderFnParams<Props extends object> = {
  children?: (VComponent | string)[] | string;
} & {
  [K in keyof Omit<Props, 'children'>]: Props[K] extends (...args: any[]) => any
    ? Props[K]
    : MaybeReactive<Props[K]>;
};

type ComponentProps = {
  [key: string]: any;
} & {
  children?: never;
};
