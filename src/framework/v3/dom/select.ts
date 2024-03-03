import {
  MaybeReactive,
  isReactive,
  isSourceReactive,
  toValue,
} from '../reactive';
import { createElement } from './dom-element';

const optionBuilder = createElement('option');

export function option(label: string) {
  return optionBuilder(label);
}

export function select({
  value,
  options,
}: {
  value: MaybeReactive<string> | MaybeReactive<number>;
  options: HTMLOptionElement[] | string[];
}) {
  const optionsElements =
    typeof options[0] === 'string' ? options.map(optionBuilder) : options;
  const select = createElement('select')(optionsElements);

  select.value = toValue(value).toString();

  if (isSourceReactive(value)) {
    select.addEventListener('change', (e) => {
      const newValue = (e as any).target.value;
      value.update(newValue);
    });
  }
  return select;
}
