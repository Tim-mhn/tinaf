import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeReactive } from '../reactive';
import { isForLoopComponent } from '../render';
import { type MaybeArray } from '../utils/array';
import { type VComponent, type WithHtml } from './component';
import { isVComponent } from './is-component';

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
    const params: RenderFnParams<Props> = this.props.map(
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
  addClass(newClass: AddClassesArgs) {
    this.classes = newClass;
    return this;
  }

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn(...this.renderFnParamsWithChildren);

    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isVComponent(this.child)) {
      this.child.init(this.parent);
      this.child.addClass(this.classes);
    } else {
      this.html = this.child;
    }
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
    if (isVComponent(this.child)) {
      this.child.destroy?.();
    }
    console.groupEnd();
  }
}

export function component<Props extends ComponentProps = NoProps>(
  renderFn: (
    ...params: RenderFnParams<Props>
  ) => HTMLElement | Comment | VComponent
) {
  return (...propsParams: RenderFnInputParams<Props>) =>
    new SimpleVComponent(propsParams, renderFn);
}

// This is like RenderFnParams but children are optional
type RenderFnInputParams<Props extends ComponentProps> = Props extends NoProps
  ? [] | [{ children: (VComponent | string)[] | string }]
  : [_RenderFnParams<Props>];

type NoProps = Record<string, never>;

type RenderFnParams<Props extends ComponentProps> = Props extends NoProps
  ? [{ children: (VComponent | string)[] | string }]
  : [_RenderFnParams<Props>];

type _RenderFnParams<Props extends ComponentProps> = {
  children?: (VComponent | string)[] | string;
} & {
  [K in keyof Omit<Props, 'children'>]: Props[K] extends Function
    ? Props[K]
    : MaybeReactive<Props[K]>;
};

type ComponentProps = {
  [key: string]: any;
} & {
  children?: never;
};

/***
 * cont Container = component(() => {
 *
 *    return div('hello container')
 * }
 *
 *
 *
 * cont App = component(() => {
 *
 *    return Container({ classes: 'w-fit h-fit'})
 * })
 *
 *
 * const App = component(() => {
 *
 *    return Container().addClass('w-fit h-fit')
 * })
 */
