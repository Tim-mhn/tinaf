import { Reactive, computed } from './reactive';
import { isReactive } from './toValue';
import type { MaybeReactive } from './types';

export class BooleanReactive extends Reactive<boolean> {
  constructor(initialValue: boolean) {
    super(initialValue);
  }

  public not() {
    return computed(() => !this.value, [this]);
  }
}

export function bool(initialValue: boolean): [Reactive<boolean>, () => void] {
  const rx = new BooleanReactive(initialValue);

  const toggle = () => rx.update(!rx.value);

  return [rx, toggle];
}

export function not(condition: MaybeReactive<boolean>) {
  if (isReactive(condition)) {
    return computed(() => !condition.value, [condition]);
  }

  return !condition;
}
