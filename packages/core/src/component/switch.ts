import { isReactive, toValue, type ReactiveValue } from '../reactive';
import type { VComponent, WithHtml } from './component';
import { distinctUntilChanged } from 'rxjs';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';
import type { AddClassesArgs } from 'src/dom/create-dom-element';

class SwitchComponent<T> implements VComponent {
  constructor(
    private reactiveValue: ReactiveValue<T>,
    private switchFn: (value: T) => VComponent | null
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

  private _warnEmptyComponentReturnedBySwitchFn() {
    console.warn(
      '[TINAF] SwitchComponent: switchFn returned null, no component will be rendered.'
    );
  }

  init(parent: WithHtml) {
    const value = toValue(this.reactiveValue);
    const component = this.switchFn(value);

    if (component) {
      component.init(parent);
      component.addClass(this.classes);
    } else {
      this._warnEmptyComponentReturnedBySwitchFn();
    }

    this._currentComponent = component;

    if (!isReactive(this.reactiveValue)) return;

    this.reactiveValue.valueChanges$
      .pipe(distinctUntilChanged())
      .subscribe((newValue) => {
        const newComponent = this.switchFn(newValue);
        this._currentComponent?.destroy?.();

        this._currentComponent = newComponent;

        if (this._currentComponent) {
          this._currentComponent.init(parent);
        } else {
          this._warnEmptyComponentReturnedBySwitchFn();
        }

        const oldNodes = this._html;

        const newNodes = this.renderOnce();

        removeOldNodesAndRenderNewNodes({
          oldNodes,
          newNodes,
          parent,
        });
      });
  }

  private classes?: AddClassesArgs;
  addClass(args: AddClassesArgs): VComponent {
    this.classes = args;
    return this;
  }
}

export function buildSwitchComponent<T>(
  reactiveValue: ReactiveValue<T>,
  switchFn: (value: T) => VComponent | null
): VComponent {
  return new SwitchComponent(reactiveValue, switchFn);
}
