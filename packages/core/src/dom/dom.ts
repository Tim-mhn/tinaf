import { _createDomElement, createDomElement } from './create-dom-element';
import { input } from './input';

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

type CreateDom2Props = Pick<
  Parameters<typeof _createDomElement>[0],
  'children' | 'classes' | 'handlers'
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
