import { objectKeys } from '../utils/object';
import { Reactive, ReactiveValue } from './reactive';
import {
  MaybeDeepReactive,
  MaybeDeepReactiveToValue,
  MaybeReactive,
} from './types';

export function isSourceReactive<T>(
  maybeRx: MaybeDeepReactive<T> | unknown
): maybeRx is Reactive<T> {
  return (
    !!maybeRx &&
    typeof maybeRx === 'object' &&
    isReactive<T> &&
    'update' in maybeRx
  );
}
export function isReactive<T>(
  maybeRx: MaybeDeepReactive<T> | unknown
): maybeRx is ReactiveValue<T> {
  return !!maybeRx && typeof maybeRx === 'object' && 'value' in maybeRx;
}

export function toValue<T>(maybeRx: MaybeReactive<T>): T;

export function toValue<T>(
  maybeRx: MaybeDeepReactive<T>
): MaybeDeepReactiveToValue<T> {
  if (isReactive(maybeRx)) return (maybeRx as ReactiveValue<T>).value as any;

  if (Array.isArray(maybeRx)) return maybeRx as any;

  if (maybeRx && typeof maybeRx === 'object') {
    let tmp: Partial<T> = {};

    // FIXME: avoid the nasty 'as any' over here :----/

    objectKeys(maybeRx).forEach((key) => {
      const v = maybeRx[key];
      const val = toValue(v as any);
      (tmp as any)[key] = val;
    });

    return tmp as any;
  }
  return maybeRx as any;
}
