/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it, vi } from 'vitest';

import { onDestroy, onInit } from './lifecycle-hooks';
import { buildMockParent } from '../test-utils/dom-element.mock';
import { component } from './v-component';
import { fakeMount } from '../test-utils/fake-mount';
import { isComponent } from '../render/render';
import { isVComponent } from './is-component';

describe('VComponent', () => {
  describe('onDestroy', () => {
    it('executes the onDestroy function when the component is destroyed', () => {
      const onDestroyFnA = vi.fn();
      const onDestroyFnB = vi.fn();

      const ComponentA = component(() => {
        onDestroy(() => onDestroyFnA());

        return 'A' as any;
      });

      const ComponentB = component(() => {
        onDestroy(() => onDestroyFnB());

        return 'B' as any;
      });

      const A = ComponentA({});
      const B = ComponentB({});

      const parent = buildMockParent();
      A.init(parent);
      B.init(parent);

      A.destroy();

      expect(onDestroyFnA).toHaveBeenCalled();
      expect(onDestroyFnB).not.toHaveBeenCalled();
    });

    it('executes the onDestroy function when the component is destroyed', () => {
      const onDestroyFnA = vi.fn();
      const onDestroyFnB = vi.fn();
      const onDestroyFnC = vi.fn();
      const onDestroyFnD = vi.fn();

      const ComponentA = component(() => {
        onDestroy(() => onDestroyFnA());

        return 'A' as any;
      });

      const ComponentB = component(() => {
        onDestroy(() => onDestroyFnB());

        return 'B' as any;
      });

      const ComponentC = component(() => {
        onDestroy(() => onDestroyFnC());

        return 'C' as any;
      });

      const ComponentD = component(() => {
        onDestroy(() => onDestroyFnD());

        return 'D' as any;
      });

      const A = ComponentA({});
      const B = ComponentB({});
      const C = ComponentC({});
      const D = ComponentD({});

      const parent = buildMockParent();
      A.init(parent);
      B.init(parent);
      C.init(parent);
      D.init(parent);

      B.destroy();

      C.destroy();

      expect(onDestroyFnA).not.toHaveBeenCalled();
      expect(onDestroyFnB).toHaveBeenCalled();
      expect(onDestroyFnC).toHaveBeenCalled();

      expect(onDestroyFnD).not.toHaveBeenCalled();
    });
  });

  describe('onInit', () => {
    it('executes the init function when the component is initialised', () => {
      const onInitFnA = vi.fn();
      const onInitFnB = vi.fn();

      const ComponentA = component(() => {
        onInit(() => onInitFnA());

        return 'A' as any;
      });

      const ComponentB = component(() => {
        onInit(() => onInitFnB());

        return 'B' as any;
      });

      const A = ComponentA({});
      const B = ComponentB({});

      const parent = buildMockParent();
      A.init(parent);

      expect(onInitFnA).toHaveBeenCalled();
      expect(onInitFnB).not.toHaveBeenCalled();
    });

    it('executes the onInit function when the component is destroyed', () => {
      const onInitFnA = vi.fn();
      const onInitFnB = vi.fn();
      const onInitFnC = vi.fn();
      const onInitFnD = vi.fn();

      const ComponentA = component(() => {
        onInit(() => onInitFnA());

        return 'A' as any;
      });

      const ComponentB = component(() => {
        onInit(() => onInitFnB());

        return 'B' as any;
      });

      const ComponentC = component(() => {
        onInit(() => onInitFnC());

        return 'C' as any;
      });

      const ComponentD = component(() => {
        onInit(() => onInitFnD());

        return 'D' as any;
      });

      const A = ComponentA({});
      const B = ComponentB({});
      const C = ComponentC({});
      const D = ComponentD({});

      const parent = buildMockParent();
      A.init(parent);
      B.init(parent);
      D.init(parent);

      expect(onInitFnA).toHaveBeenCalled();
      expect(onInitFnB).toHaveBeenCalled();
      expect(onInitFnC).not.toHaveBeenCalled();
      expect(onInitFnD).toHaveBeenCalled();
    });

    it('executes the nested components onInit before the parent component onInit', () => {
      let lastCall: 'Child' | 'Parent' | undefined;

      const childOnInitFn = vi.fn(() => (lastCall = 'Child'));
      const parentOnInitFn = () => (lastCall = 'Parent');

      const Child = component(() => {
        onInit(() => childOnInitFn());

        return 'Child' as any;
      });

      const Parent = component(() => {
        onInit(() => parentOnInitFn());

        return Child();
      });

      const htmlContainer = buildMockParent();

      Parent().init(htmlContainer);

      expect(childOnInitFn).toHaveBeenCalled();
      expect(lastCall).toBe('Parent');
    });
  });

  it('allows a parent to inject values to its children through the context', () => {
    const fn = vi.fn();
    // @ts-expect-error
    const Parent = component(({ children = [] }) => {
      children.forEach((c) => {
        if (isVComponent(c))
          c.provide?.<Context>({
            text: 'hello world',
          });
      });

      return children;
    });

    type Context = {
      text: string;
    };
    const Child = component<Record<string, never>, Context>(
      (_props, context) => {
        const { text } = context || {};

        fn(text);
        return 'hello world' as any;
      }
    );

    const Cmp = component(() => {
      return (
        <Parent>
          <Child />
        </Parent>
      );
    });

    fakeMount(Cmp);

    expect(fn).toHaveBeenCalledWith('hello world');
  });
});
