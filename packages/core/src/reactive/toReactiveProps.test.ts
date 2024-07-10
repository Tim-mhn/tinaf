import { describe, expect, it } from 'vitest';
import { toReactiveProps } from './toReactiveProps';
import { computed, reactive } from './reactive';
import { isReactive, toValue } from './toValue';
import type { MaybeReactive } from './types';

const expectToBeReactiveWithValue = <T>(
  reactiveValue: MaybeReactive<T>,
  { value }: { value: T }
) => {
  expect(isReactive(reactiveValue)).toBeTruthy();
  expect(toValue(reactiveValue)).toEqual(value);
};

describe('toReactiveProps', () => {
  it('transforms a plain object into itself', () => {
    const { a, b } = toReactiveProps({ a: 1, b: 2 });

    expect(a).toEqual(1);
    expect(b).toEqual(2);
  });

  it('transforms a reactive object into reactive props', () => {
    const props = computed(
      () => ({
        a: 1,
        b: 2,
      }),
      [reactive('')]
    );

    const { a, b } = toReactiveProps(props);

    expectToBeReactiveWithValue(a, { value: 1 });
    expectToBeReactiveWithValue(b, { value: 2 });
  });

  it('can transform nested props into reactive props', () => {
    const props = computed(
      () => ({
        a: 1,
        b: {
          c: 'c',
          d: 'd',
        },
      }),
      [reactive('')]
    );

    const {
      a,
      b: { c, d },
    } = toReactiveProps(props, { deep: true });

    expectToBeReactiveWithValue(a, { value: 1 });
    expectToBeReactiveWithValue(c, { value: 'c' });
    expectToBeReactiveWithValue(d, { value: 'd' });
  });
});
