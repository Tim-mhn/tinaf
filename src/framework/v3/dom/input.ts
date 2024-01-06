import { component } from '../component';
import { createElement } from './dom-element';
import { objectEntries, objectKeys } from '../object';
import { MaybeReactive, isReactive, toValue } from '../reactive';

type InputProps = {
  value: MaybeReactive<string, false>;
  placeholder?: MaybeReactive<string>;
  disabled?: MaybeReactive<boolean>;
  type?: HTMLInputElement['type'];
};

export const _input = createElement('input');

export function input(
  props: InputProps,
  options?: Parameters<typeof _input>[1]
) {
  return component(() => {
    const maybeRxValue = props.value;

    const updateReactiveDataOnChange = (e?: Event) => {
      if (isReactive(maybeRxValue)) {
        const newValue = (e?.target as HTMLInputElement)?.value;
        maybeRxValue.update(newValue);
      }
    };
    const overrideOptions: typeof options = {
      ...options,
      change: updateReactiveDataOnChange,
    };

    const inputCmp = _input('', overrideOptions) as HTMLInputElement;

    Object.keys(props).forEach((key) => {
      const v = props[key];
      if (v === undefined) return;
      inputCmp[key] = toValue(v);
    });
    return () => inputCmp;
  });
}

/***
 *
 *
 *
 * form(
 *      input(),
 *      input(),
 *      button("Submit", { type: "submit"}),
 *      {
 *        submit: doSmth
 *      }
 * )
 *
 */
