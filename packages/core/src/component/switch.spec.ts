import { describe, it, expect, vi } from 'vitest';
import { bool } from '../reactive/boolean';
import { VComponent } from './component';
import { buildMockParent } from '../test-utils/dom-element.mock';
import { reactive } from '../reactive/reactive';
import { buildSwitchComponent } from './switch';

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
      const switchComponent = buildSwitchComponent(value, (v) => {
        switch (v) {
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
