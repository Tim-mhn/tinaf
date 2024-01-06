import { objectEntries, objectKeys } from '../object';
import { Reactive, computed, reactive } from '../reactive';

type ValidatorFn<T> = (value: T) => boolean;

type ReactiveFormInput<T extends object> = {
  [K in keyof T]: [Reactive<T[K]>, ValidatorFn<T[K]>];
};

export function reactiveForm<T extends object>(props: ReactiveFormInput<T>) {
  const validate = () =>
    objectKeys(props).every((key) => {
      const [reactiveControl, validatorFn] = props[key];
      return validatorFn(reactiveControl.value);
    });

  const valid = computed(() => validate());
  const invalid = computed(() => !valid.value);
  return { valid, invalid };
}
