import { type MaybeArray } from '../../utils/array';

export type WithHtml = {
  html: HTMLElement;
};

export interface ComponentV2 {
  init(parent: WithHtml): void;
  renderOnce(): MaybeArray<HTMLElement | Comment>;
  __type: 'componentV2';
  html: MaybeArray<HTMLElement | Comment>;
}

/**
 * NB: not sure if this is the right interface to use. Mounting requires to also render some stuff on the DOM
 */
