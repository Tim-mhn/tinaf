import { inputReactive, type InputReactive } from '../reactive';
import { _createDomElement, createDomElement } from './create-dom-element';
import { input, type HTMLInputElementOptions } from './input';
import { logger } from '../common';
import { img } from './img';
import { type VInputComponent } from './input';
export const div = createDomElement('div');
export const span = createDomElement('span');
export const p = createDomElement('p');
export const button = createDomElement('button');
export const a = createDomElement('a');
export const table = createDomElement('table');
export const td = createDomElement('td');
export const th = createDomElement('th');
export const tr = createDomElement('tr');
export const ul = createDomElement('ul');
export const ol = createDomElement('ol');
export const li = createDomElement('li');

/**
 * Temporary vnodes to have consistent API for children components
 */

type CreateDom2Props = Partial<
  Pick<
    Parameters<typeof _createDomElement>[0],
    'children' | 'classes' | 'handlers'
  >
>;

export const div2 = (args: CreateDom2Props) =>
  _createDomElement({
    type: 'div',
    ...args,
  });

export const button2 = (args: CreateDom2Props) =>
  _createDomElement({
    type: 'button',
    ...args,
  });

export const input2 = (
  args: Partial<HTMLInputElementOptions> &
    CreateDom2Props & { value?: InputReactive<string | number> }
): VInputComponent<string | number> => {
  console.log(args);
  const { value, children: _noChildrenForInput, classes, ...props } = args;

  if (!value) {
    logger.warn(`No value provided for input component`, args);
    return input(inputReactive<string | number>(''), args).addClass(
      classes || ''
    );
  }
  return input(value, props).addClass(classes || '');
};

export const img2 = (args: CreateDom2Props & Parameters<typeof img>[0]) => {
  const { children, ...props } = args;
  return img(props);
};

export const li2 = (args: CreateDom2Props) =>
  _createDomElement({
    type: 'li',
    ...args,
  });

export const ul2 = (args: CreateDom2Props) =>
  _createDomElement({
    type: 'ul',
    ...args,
  });

export const span2 = (args: CreateDom2Props) =>
  _createDomElement({
    type: 'span',
    ...args,
  });
