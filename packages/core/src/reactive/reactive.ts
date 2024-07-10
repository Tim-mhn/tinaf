/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  skip,
  startWith,
} from 'rxjs';
import type { MaybeReactive } from './types';
import { isReactive } from './toValue';
export interface ReactiveValue<T> {
  value: T;
  valueChanges$: Observable<T>;
}

export class Reactive<T> implements ReactiveValue<T> {
  private _value: T;
  constructor(initialValue: T) {
    this._value = initialValue;
  }

  private _valueChanges$ = new Subject<T>();
  public valueChanges$ = this._valueChanges$.asObservable();

  update(newValue: T) {
    this._value = newValue;
    this._valueChanges$.next(newValue);
  }

  get value() {
    return this._value;
  }
}

export function reactive<T>(initialValue: T) {
  const rx = new Reactive(initialValue);
  return rx;
}

class Computed<T> implements ReactiveValue<T> {
  valueChanges$: Observable<T>;

  constructor(public getterFn: () => T, sources: ReactiveValue<any>[]) {
    if (sources.length === 0)
      throw new Error(
        'Computed value was created without any source. Please include at least 1 source'
      );
    this.valueChanges$ = combineLatest(
      sources.map((s) => s.valueChanges$.pipe(startWith('')))
    ).pipe(
      skip(1),
      map(() => getterFn())
    );
  }

  get value() {
    return this.getterFn();
  }
}

export class InputReactive<T extends string | number>
  implements ReactiveValue<T>
{
  private _value: { value: T; fromUI?: boolean };
  constructor(initialValue: T) {
    this._value = {
      value: initialValue,
    };
  }

  private _valueChanges$ = new Subject<{ value: T; fromUI: boolean }>();
  public valueChanges$ = this._valueChanges$
    .asObservable()
    .pipe(map((v) => v.value));

  public nonUiValueChanges$ = this._valueChanges$.pipe(
    filter(({ fromUI }) => !fromUI)
  );

  update(newValue: T, { fromUI }: { fromUI: boolean } = { fromUI: false }) {
    this._value = { value: newValue, fromUI };
    this._valueChanges$.next({ value: newValue, fromUI });
  }

  get value() {
    return this._value.value;
  }
}

export function inputReactive<T extends string | number>(initialValue: T) {
  return new InputReactive(initialValue);
}

export function computed<T>(getterFn: () => T, sources: ReactiveValue<any>[]) {
  return new Computed(getterFn, sources);
}

export function maybeComputed<T>(
  getterFn: () => T,
  sources: MaybeReactive<any>[]
) {
  const reactiveSources = sources.filter(isReactive);
  if (reactiveSources.length === 0) return getterFn();

  return computed(getterFn, reactiveSources);
}
