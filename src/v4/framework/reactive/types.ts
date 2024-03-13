import { Reactive, ReactiveValue } from './reactive';

export type MaybeReactiveProps<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? MaybeReactiveProps<T[K]> | MaybeReactive<T[K]>
    : MaybeReactive<T[K]>;
};

export type MaybeDeepReactive<T> = T extends object
  ? MaybeReactive<T> | MaybeReactiveProps<T>
  : MaybeReactive<T>;

export type MaybeReactive<T> = ReactiveValue<T> | T;
