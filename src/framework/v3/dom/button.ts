import { createElement } from './dom-element';

type ButtonExtraOptions = { type: HTMLButtonElement['type'] };

type Params = Parameters<ReturnType<typeof createElement>>;

export const button = (
  childOrChildren: Params[0],
  options: Params[1] & Partial<ButtonExtraOptions>
) => {
  const _button = createElement('button');

  const { type, ...otherOptions } = options;

  const btn = _button(childOrChildren, otherOptions);
  if (type) btn.type = type;

  return btn;
};
