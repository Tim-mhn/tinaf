import { createDomElement } from './create-dom-element';

const _img = createDomElement('img');

// TODO: handle reactive imgOptions
export const img = (imgOptions: Partial<HTMLImageElement>) => {
  return _img().withOptions(imgOptions);
};
