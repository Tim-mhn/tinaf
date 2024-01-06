import { Subject } from 'rxjs';
import { MaybeReactive } from './types';

export interface ReactiveValue<T> {
  value: T;
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

export const REACTIVES: Reactive<any>[] = [];
export function reactive<T>(initialValue: T) {
  const rx = new Reactive(initialValue);
  REACTIVES.push(rx);
  return rx;
}

export function getReactives(): Readonly<Reactive<any>[]> {
  return [...REACTIVES];
}

export function clearReactives() {
  const length = REACTIVES.length;
  for (let index = 0; index < length; index++) {
    REACTIVES.pop();
  }
}

export function bool(initialValue: boolean): [Reactive<boolean>, () => void] {
  const rx = reactive(initialValue);

  const toggle = () => rx.update(!rx.value);

  return [rx, toggle];
}

class Computed<T> implements ReactiveValue<T> {
  constructor(private getterFn: () => T) {}

  get value() {
    return this.getterFn();
  }
}

export function computed<T>(getterFn: () => T) {
  return new Computed(getterFn);
}
