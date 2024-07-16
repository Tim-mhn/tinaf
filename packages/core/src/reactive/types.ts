import { type ReactiveValue } from './reactive';

/*
 * each value is either a regular object or a reactive value. There can't be more than 1-level deep reactive * * values
 */
export type MaybeReactiveProps<T extends object> = {
  [K in keyof T]: MaybeReactive<T[K]>;
};

export type MaybeDeepReactive<T> = IsPrimitive<T> extends true
  ? MaybeReactive<T>
  : T extends object
  ? MaybeReactive<T> | MaybeReactiveProps<T>
  : never;

export type MaybeReactive<T> = ReactiveValue<T> | T;

type rTov<T> = T extends MaybeReactive<infer U> ? U : never;

type IsPrimitive<T> = T extends string
  ? true
  : T extends boolean
  ? true
  : T extends number
  ? true
  : false;

export type MaybeDeepReactiveToValue<T> = IsPrimitive<T> extends true
  ? T
  : T extends MaybeReactiveProps<infer V>
  ? rTov<V>
  : T extends MaybeReactive<infer U>
  ? U
  : never;
