import { Observable, Subject, combineLatest, map, skip, startWith } from 'rxjs';
import { MaybeReactive } from './types';

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

export function bool(initialValue: boolean): [Reactive<boolean>, () => void] {
  const rx = reactive(initialValue);

  const toggle = () => rx.update(!rx.value);

  return [rx, toggle];
}

class Computed<T> implements ReactiveValue<T> {
  valueChanges$: Observable<T>;

  constructor(private getterFn: () => T, sources: ReactiveValue<any>[]) {
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

export function computed<T>(getterFn: () => T, sources: ReactiveValue<any>[]) {
  return new Computed(getterFn, sources);
}
