import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeArray } from '../utils/array';

export type WithHtml = {
  html: HTMLElement;
};

export type HTML = HTMLElement | Comment;

export interface VComponent {
  init(parent: WithHtml): void;
  renderOnce(): MaybeArray<HTML>;
  __type: 'V_COMPONENT';
  html: MaybeArray<HTML>;
  addClass(args?: AddClassesArgs): VComponent;
  destroy?(): void;
  parent: WithHtml;
}

export type TinafElement = HTML | VComponent;
