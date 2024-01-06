import { component } from '../component';
import { MaybeReactiveProps, toValue } from '../reactive';
import { createElement } from './dom-element';

type ButtonExtraOptions = {
  type: HTMLButtonElement['type'];
  disabled: boolean;
};

type Params = Parameters<ReturnType<typeof createElement>>;

export const button = (
  childOrChildren: Params[0],
  options: MaybeReactiveProps<Params[1] & Partial<ButtonExtraOptions>>
) => {
  return component(() => {
    const _button = createElement('button');

    const v = toValue(options);
    const { type, disabled, ...otherOptions } = v;

    const btn = _button(childOrChildren, otherOptions);
    if (type) btn.type = type;
    if (disabled !== undefined) btn.disabled = disabled;

    return () => btn;
  });
};
