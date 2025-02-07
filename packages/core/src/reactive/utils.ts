import { type MaybeArray, toArray } from '../utils/array';
import { objectKeys } from '../utils/object';
import { computed, Reactive, type ReactiveValue } from './reactive';
import { isReactive, toValue } from './toValue';
import type { MaybeReactive, MaybeReactiveProps } from './types';

export function getReactiveElements<T>(
  maybeArray?: MaybeArray<MaybeReactive<T>>
) {
  const arr = toArray(maybeArray);
  return arr?.filter(isReactive) as Reactive<T>[];
}

export function getReactiveElementsFromObject<T extends object>(
  obj: MaybeReactiveProps<T>
) {
  const keys = objectKeys(obj);

  const reactiveElements: Partial<{
    [K in keyof T]: ReactiveValue<T[K]>;
  }> = {};

  for (const key of keys) {
    if (isReactive(obj[key])) {
      reactiveElements[key] = obj[key] as ReactiveValue<T[keyof T]>;
    }
  }

  return reactiveElements;
}

export function xequal<A, B extends A>(
  a: MaybeReactive<A>,
  b: MaybeReactive<B>
) {
  return computed(() => toValue(a) === toValue(b));
}

export function xif(condition: MaybeReactive<boolean>) {
  function xthen<T>(trueValue: MaybeReactive<T>) {
    function xelse(falseValue: MaybeReactive<T>) {
      return computed(() =>
        toValue(condition) ? toValue(trueValue) : toValue(falseValue)
      );
    }

    return { xelse };
  }

  return { xthen };
}

/**
 *
 * const cls = if(equal(value, activeClass)).then(activeClass).else("");
 */
