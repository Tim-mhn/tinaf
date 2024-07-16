import { type MaybeArray, toArray } from '../utils/array';
import { objectKeys } from '../utils/object';
import { Reactive, type ReactiveValue } from './reactive';
import { isReactive } from './toValue';
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
