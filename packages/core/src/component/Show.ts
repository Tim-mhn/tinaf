import { Subscription } from 'rxjs';
import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeReactive, isReactive, toValue } from '../reactive';
import type { MaybeArray } from '../utils/array';
import type { HTML, TinafElement, VComponent, WithHtml } from './component';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';
import {
  destroyChildren,
  initChildren,
  renderChildren,
} from '../render-utils/render-children';
import { logger } from '../common';
import { logMethod } from '../common/logger';

function buildPlaceholderComment() {
  const commentText = `placeholder--${crypto.randomUUID()}`;
  const comment = document.createComment(commentText);
  return comment;
}

// TODO: refactor this to use switchComponent
class ConditionallyRenderedComponent implements VComponent {
  constructor(
    private condition: MaybeReactive<boolean>,
    private children: TinafElement[] = [],
    private fallback?: VComponent // TODO: handle list of children  for fallback
  ) {}

  readonly __type = 'V_COMPONENT';

  private readonly __subtype = 'Show';

  private _html!: MaybeArray<HTML>;
  get html() {
    return this._html;
  }

  renderOnce() {
    if (toValue(this.condition)) {
      this.fallback?.destroy?.();
      this._html = renderChildren(this.children);
      return this._html;
    }

    try {
      destroyChildren(this.children);
    } catch (err) {
      console.error(err);
    }

    if (!this.fallback) {
      this._html = buildPlaceholderComment();

      return this._html;
    }

    this._html = this.fallback.renderOnce();

    return this._html;
  }

  private _initChild(parent: WithHtml) {
    if (toValue(this.condition)) initChildren(this.children, parent);
    else if (this.fallback) this.fallback.init(parent);
  }

  classes?: AddClassesArgs;
  addClass(args: AddClassesArgs) {
    this.classes = args;
    return this;
  }

  private subs = new Subscription();

  parent!: WithHtml;
  init(parent: WithHtml) {
    this.parent = parent;
    this._initChild(parent);

    if (!isReactive(this.condition)) return;

    const sub = this.condition.valueChanges$.subscribe(() => {
      const oldNodes = this._html;

      this._initChild(parent);

      const newNodes = this.renderOnce();

      removeOldNodesAndRenderNewNodes({
        oldNodes,
        newNodes,
        parent,
      });
    });

    this.subs.add(sub);

    if (!this.classes) return;
    logger.warn('addClass has no effect with <Show />');

    // this.children.addClass(this.classes);
    // this.fallback?.addClass?.(this.classes);
  }

  destroy(): void {
    this.subs.unsubscribe();
    destroyChildren(this.children);
    this.fallback?.destroy?.();
  }
}

export const Show = ({
  when,
  children,
  fallback,
}: {
  children?: TinafElement[];
  when: MaybeReactive<boolean>;
  fallback?: VComponent; // TODO: handle any TinafElement and potentially list
}) => {
  return new ConditionallyRenderedComponent(when, children, fallback);
};
