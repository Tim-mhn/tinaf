import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeArray } from '../utils/array';
import type { EmptyContext, Context } from './v-component';

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
  // Q: does it really make sense to add a generic to provide ?
  provide?<Ctx extends Context = EmptyContext>(ctx: Ctx): void;
}

export type TinafElement = HTML | VComponent;
