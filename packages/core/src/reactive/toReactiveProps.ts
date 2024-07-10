/* eslint-disable @typescript-eslint/ban-ts-comment */
import { objectKeys } from '../utils/object';
import { computed } from './reactive';
import { isReactive, toValue } from './toValue';
import type {
  MaybeDeepReactive,
  MaybeReactive,
  MaybeReactiveProps,
} from './types';

type toReactivePropsOutput<T extends object, D extends boolean> = D extends true
  ? DeepO<T>
  : O<T>;

export function toReactiveProps<T extends object, Deep extends boolean = false>(
  obj: MaybeReactive<T> | MaybeReactiveProps<T>,
  // @ts-expect-error
  options: { deep: Deep } = { deep: false }
): toReactivePropsOutput<T, Deep> {
  if (!isReactive(obj)) return obj as toReactivePropsOutput<T, Deep>;

  if (options.deep)
    return recursivelyBuildReactiveProps(obj) as toReactivePropsOutput<T, Deep>;

  return buildSimpleReactiveProps(obj) as toReactivePropsOutput<T, Deep>;
}

function recursivelyBuildReactiveProps<T extends object>(
  obj: MaybeReactive<T> | MaybeReactiveProps<T>
): DeepO<T> {
  if (!isReactive(obj)) return obj as T;

  const reactiveProps: Partial<DeepO<T>> = {};

  const objValue = toValue(obj as MaybeDeepReactive<T>) as T;

  for (const key of objectKeys(objValue)) {
    const v = objValue[key];

    if (typeof v === 'object' && v !== null) {
      const localReactive = computed(() => (toValue(obj) as T)[key], [obj]);
      const nestedReactiveProps = toReactiveProps(localReactive, {
        deep: true,
      });

      // @ts-expect-error
      reactiveProps[key] = nestedReactiveProps;
    } else {
      const reactiveProp = computed(
        // @ts-expect-error
        () => toValue(obj as MaybeDeepReactive<T>)[key],
        [obj]
      );
      // @ts-expect-error
      reactiveProps[key] = reactiveProp;
    }
  }

  return reactiveProps as DeepO<T>;
}

type O<T extends object> = { [K in keyof T]: MaybeReactive<T[K]> };
type DeepO<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepO<T[K]> : MaybeReactive<T[K]>;
};

function buildSimpleReactiveProps<T extends object>(
  obj: MaybeReactive<T> | MaybeReactiveProps<T>
): O<T> {
  if (!isReactive(obj)) return obj as T;

  const reactiveProps: Partial<O<T>> = {};

  for (const key of objectKeys(toValue(obj))) {
    const reactiveProp = computed(() => toValue(obj)[key], [obj]);

    reactiveProps[key] = reactiveProp;
  }

  return reactiveProps as O<T>;
}
