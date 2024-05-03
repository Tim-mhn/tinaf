import { Reactive, computed } from './reactive';

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

// function notFn(condition: MaybeReactive<boolean>) {
//   if (isReactive(condition)) {
//     return computed(() => !condition.value, [condition]);
//   }

//   return !condition;
// }
