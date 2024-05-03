import { objectKeys } from '../utils/object';
import { type MaybeReactiveProps } from '../reactive';
import { isForLoopComponent } from '../render';
import { type MaybeArray } from '../utils/array';
import { type VComponent, type WithHtml } from './component';
import { isVComponent } from './is-component';

export class SimpleVComponent<Props extends object = object>
  implements VComponent
{
  constructor(
    private props: RenderFnParams<MaybeReactiveProps<Props>>,
    public renderFn: (
      ...params: RenderFnParams<MaybeReactiveProps<Props>>
    ) => HTMLElement | Comment | VComponent
  ) {}

  readonly __type = 'V_COMPONENT';

  child!: HTMLElement | Comment | VComponent;
  html!: MaybeArray<HTMLElement | Comment>;
  parent!: WithHtml;

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn(...this.props);
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

    throw new Error('path way not supported in renderOnce');
  }
}

// TODO: better name these params
type RenderFnParams<Props extends object> = Props extends Record<string, never>
  ? []
  : [Props];
export function component<Props extends object = Record<string, never>>(
  renderFn: (
    ...params: RenderFnParams<MaybeReactiveProps<Props>>
  ) => HTMLElement | Comment | VComponent
) {
  return (...propsParams: RenderFnParams<MaybeReactiveProps<Props>>) =>
    new SimpleVComponent(propsParams, renderFn);
}
