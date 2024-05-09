import { createDomElement } from './create-dom-element';

const _img = createDomElement('img');

export const img = (imgOptions: Partial<HTMLImageElement>) => {
  return _img().withOptions(imgOptions);
};
