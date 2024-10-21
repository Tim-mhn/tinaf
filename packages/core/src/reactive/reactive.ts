/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Observable,
  ReplaySubject,
  Subject,
  combineLatest,
  filter,
  map,
  skip,
  startWith,
} from 'rxjs';
export interface ReactiveValue<T> {
  value: T;
  valueChanges$: Observable<T>;
}

let observables: ReactiveValue<any>[] = [];

export class Reactive<T> implements ReactiveValue<T> {
  private _value: T;
  constructor(initialValue: T) {
    this._value = initialValue;
  }

  private _valueChanges$ = new ReplaySubject<T>(1);
  public valueChanges$ = this._valueChanges$.asObservable();

  update(newValue: T) {
    this._value = newValue;
    this._valueChanges$.next(newValue);
  }

  get value() {
    observables.push(this);
    return this._value;
  }
}

export function reactive<T>(initialValue: T) {
  const rx = new Reactive(initialValue);
  return rx;
}

class Computed<T> implements ReactiveValue<T> {
  valueChanges$: Observable<T>;

  constructor(public getterFn: () => T) {
    getterFn();

    const sources = [...observables];

    this.valueChanges$ = combineLatest(
      sources.map((s) => s.valueChanges$.pipe(startWith('')))
    ).pipe(
      skip(1),
      map(() => getterFn())
    );

    observables = [];
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

export function computed<T>(getterFn: () => T) {
  return new Computed(getterFn);
}
