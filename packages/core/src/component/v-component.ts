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

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn(...this.renderFnParamsWithChildren);
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isVComponent(this.child)) {
      (this.child as any as SimpleVComponent).init(this.parent);
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
    console.log('Destroying component');
    console.log(this.props);
    if (isVComponent(this.child)) {
      this.child.destroy?.();
    }
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
  ? [] | [{ children: VComponent[] }]
  : [_RenderFnParams<Props>];

type NoProps = Record<string, never>;

type RenderFnParams<Props extends ComponentProps> = Props extends NoProps
  ? [{ children: VComponent[] }]
  : [_RenderFnParams<Props>];

type _RenderFnParams<Props extends ComponentProps> = {
  children?: VComponent[];
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

// const c = component<{ onAddItem: () => void }>(({ onAddItem }) => {
//   return div('hello');
// });

// type t = RenderFnParams<{ hello: string }>;

// c({
//   onAddItem: () => {},
// });
