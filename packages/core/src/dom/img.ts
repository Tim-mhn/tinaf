import { createDomElement } from './create-dom-element';

const _img = (injections: Parameters<typeof createDomElement>[1]) =>
  createDomElement('img', injections)();

// TODO: handle reactive imgOptions
export const img = (
  imgOptions: Partial<HTMLImageElement>,
  injections: Parameters<typeof createDomElement>[1]
) => {
  return _img(injections).withOptions(imgOptions);
};
