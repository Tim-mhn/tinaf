import { Reactive, type ReactiveValue } from './reactive';

export const reactiveList = <T>(initialValue: T[] = []) => {
  return new ReactiveList(initialValue);
};

class ReactiveList<T> extends Reactive<T[]> {
  constructor(initialValue: T[] = []) {
    super(initialValue);
  }

  add(item: T) {
    this.update([...this.value, item]);
  }
}
