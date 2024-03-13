import { Reactive, ReactiveValue } from './reactive';

// export type MaybeReactive<
//   T,
//   AllowComputed extends boolean = true
// > = AllowComputed extends true ? ReactiveValue<T> | T : Reactive<T> | T;

// export type MaybeReactiveProps<T extends object> = {
//   [K in keyof T]: T[K] extends object
//     ? MaybeReactiveProps<T[K]> | MaybeReactive<T[K]>
//     : MaybeReactive<T[K]>;
// };

// export type MaybeDeepReactive<T> = T extends object
//   ? MaybeReactive<T> | MaybeReactiveProps<T>
//   : MaybeReactive<T>;

// type rTov<T> = T extends MaybeReactive<infer U> ? U : never;

// type IsPrimitive<T> = T extends string
//   ? true
//   : T extends boolean
//   ? true
//   : T extends number
//   ? true
//   : false;
// export type MaybeDeepReactiveToValue<T> = IsPrimitive<T> extends true
//   ? T
//   : T extends MaybeReactiveProps<infer V>
//   ? rTov<V>
//   : T extends MaybeReactive<infer U>
//   ? U
//   : never;

export type MaybeReactive<T> = ReactiveValue<T> | T;
