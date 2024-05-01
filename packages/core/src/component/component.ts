import { type MaybeArray } from '../utils/array';

export type WithHtml = {
  html: HTMLElement;
};

export interface VComponent {
  init(parent: WithHtml): void;
  renderOnce(): MaybeArray<HTMLElement | Comment>;
  __type: 'V_COMPONENT';
  html: MaybeArray<HTMLElement | Comment>;
}

/**
 * NB: not sure if this is the right interface to use. Mounting requires to also render some stuff on the DOM
 */
