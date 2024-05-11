import {
  isReactive,
  toValue,
  type MaybeReactive,
  type ReactiveValue,
} from '../reactive';
import type { VComponent, WithHtml } from './component';
import { distinctUntilChanged } from 'rxjs';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';

class SwitchComponent<T> implements VComponent {
  constructor(
    private reactiveValue: ReactiveValue<T>,
    private switchFn: (value: T) => VComponent
  ) {}

  readonly __type = 'V_COMPONENT';
  private _html: ReturnType<VComponent['renderOnce']> = [];

  get html() {
    return this._html;
  }

  private _currentComponent: VComponent | null = null;
  renderOnce() {
    const newHtml = this._currentComponent?.renderOnce?.() || [];
    this._html = newHtml;
    return this._html;
  }

  init(parent: WithHtml) {
    const value = toValue(this.reactiveValue);
    const component = this.switchFn(value);

    component.init(parent);

    this._currentComponent = component;

    if (!isReactive(this.reactiveValue)) return;

    this.reactiveValue.valueChanges$
      .pipe(distinctUntilChanged())
      .subscribe((newValue) => {
        const newComponent = this.switchFn(newValue);
        this._currentComponent?.destroy?.();

        this._currentComponent = newComponent;

        this._currentComponent.init(parent);

        const oldNodes = this._html;

        const newNodes = this.renderOnce();

        removeOldNodesAndRenderNewNodes({
          oldNodes,
          newNodes,
          parent,
        });
      });
  }
}

export function buildSwitchComponent<T>(
  reactiveValue: MaybeReactive<T>,
  switchFn: (value: T) => VComponent
): VComponent {
  return new SwitchComponent(reactiveValue, switchFn);
}
