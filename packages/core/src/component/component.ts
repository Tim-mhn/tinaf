import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeArray } from '../utils/array';

export type WithHtml = {
  html: HTMLElement;
};

export interface VComponent {
  init(parent: WithHtml): void;
  renderOnce(): MaybeArray<HTMLElement | Comment>;
  __type: 'V_COMPONENT';
  html: MaybeArray<HTMLElement | Comment>;
  addClass(args?: AddClassesArgs): VComponent;
  destroy?(): void;
}

export type TinafElement = HTMLElement | Comment | VComponent;
