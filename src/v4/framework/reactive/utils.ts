import { MaybeArray, toArray } from '../utils/array';
import { Reactive } from './reactive';
import { isReactive } from './toValue';
import { MaybeReactive } from './types';

export function getReactiveElements<T>(
  maybeArray?: MaybeArray<MaybeReactive<T>>
) {
  const arr = toArray(maybeArray);
  return arr?.filter(isReactive) as Reactive<T>[];
}
