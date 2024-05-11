import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bool } from '../reactive/boolean';
import { VComponent, WithHtml } from './component';
import { MaybeReactive } from '../reactive/types';
import { isReactive, toValue } from '../reactive/toValue';
import {
  buildMockHtmlElement,
  buildMockParent,
} from '../test-utils/dom-element.mock';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';
import { build } from 'vite';
import { Reactive, reactive } from '../reactive/reactive';
import { MaybeArray } from '../utils/array';
import { distinctUntilChanged } from 'rxjs';

class SwitchComponent<T> implements VComponent {
  constructor(
    private reactiveValue: MaybeReactive<T>,
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

function buildSwitchComponent<T>(
  reactiveValue: MaybeReactive<T>,
  switchFn: (value: T) => VComponent
): VComponent {
  return new SwitchComponent(reactiveValue, switchFn);
}
describe('switchComponent', () => {
  describe('binary switch component', () => {
    const Comp1: VComponent = {
      init: vi.fn(),
      renderOnce: vi.fn(),
      __type: 'V_COMPONENT',
      html: [],
      destroy: vi.fn(),
    };

    const Comp2: VComponent = {
      init: vi.fn(),
      renderOnce: vi.fn(),
      __type: 'V_COMPONENT',
      html: [],
      destroy: vi.fn(),
    };

    // NB: this is to easily identify the component when debugging the test
    (Comp1 as any).name = 'Comp1';
    (Comp2 as any).name = 'Comp2';

    it('inits the right component initially when initialising the switch component', () => {
      const [reactiveValue, toggleCondition] = bool(true);

      const switchComp = buildSwitchComponent(reactiveValue, (renderComp1) => {
        return renderComp1 ? Comp1 : Comp2;
      });

      const mockParent = buildMockParent();
      switchComp.init(mockParent);
      expect(Comp1.init).toHaveBeenCalledWith(mockParent);
    });

    it('destroys the previous component and inits the new component when the reactiveValue changes', () => {
      const [reactiveValue, toggleCondition] = bool(true);

      const switchComp = buildSwitchComponent(reactiveValue, (renderComp1) => {
        return renderComp1 ? Comp1 : Comp2;
      });

      const mockParent = buildMockParent();

      switchComp.init(mockParent);

      toggleCondition();

      // reactiveValue is now FALSE --> render Comp2

      expect(Comp1.destroy).toHaveBeenCalled();
      expect(Comp2.init).toHaveBeenCalledWith(mockParent);

      switchComp.renderOnce();

      expect(Comp2.renderOnce).toHaveBeenCalled();

      toggleCondition();

      // reactiveValue is now true --> render Comp1

      expect(Comp2.destroy).toHaveBeenCalled();
      expect(Comp1.init).toHaveBeenCalledWith(mockParent);
      expect(Comp1.renderOnce).toHaveBeenCalled();
    });
  });

  describe('ternary switch component', () => {
    function createComponents() {
      const A: VComponent = {
        init: vi.fn(),
        renderOnce: vi.fn(),
        __type: 'V_COMPONENT',
        html: [],
        destroy: vi.fn(),
      };

      const B: VComponent = {
        init: vi.fn(),
        renderOnce: vi.fn(),
        __type: 'V_COMPONENT',
        html: [],
        destroy: vi.fn(),
      };

      const C: VComponent = {
        init: vi.fn(),
        renderOnce: vi.fn(),
        __type: 'V_COMPONENT',
        html: [],
        destroy: vi.fn(),
      };

      // NB: this is to easily identify the component when debugging the test
      (A as any).name = 'A';
      (B as any).name = 'B';
      (C as any).name = 'C';

      return { A, B, C };
    }

    it('works as expected with a ternary switch component', () => {
      const { A, B, C } = createComponents();
      const value = reactive<'a' | 'b' | 'c'>('a');
      const switchComponent = buildSwitchComponent(value, (value) => {
        switch (value) {
          case 'a':
            return A;
          case 'b':
            return B;
          case 'c':
            return C;
        }
      });

      switchComponent.init(buildMockParent());
      switchComponent.renderOnce();

      expect(A.init).toHaveBeenCalled();

      value.update('b');

      expect(A.destroy).toHaveBeenCalled();
      expect(B.init).toHaveBeenCalled();

      value.update('c');

      expect(B.destroy).toHaveBeenCalled();
      expect(C.init).toHaveBeenCalled();
    });

    it('does not destroy the component if the same value is emitted twice', () => {
      const { A, B, C } = createComponents();

      const value = reactive<'a' | 'b' | 'c'>('a');
      const switchComponent = buildSwitchComponent(value, (value) => {
        switch (value) {
          case 'a':
            return A;
          case 'b':
            return B;
          case 'c':
            return C;
        }
      });

      switchComponent.init(buildMockParent());
      switchComponent.renderOnce();

      value.update('b');

      value.update('b');

      expect(B.destroy).not.toHaveBeenCalled();
      expect(B.init).toHaveBeenCalledTimes(1);
    });
  });
});
