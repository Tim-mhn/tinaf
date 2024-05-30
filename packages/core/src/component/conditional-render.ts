import { Subscription } from 'rxjs';
import type { AddClassesArgs } from '../dom/create-dom-element';
import { type MaybeReactive, isReactive, toValue } from '../reactive';
import type { MaybeArray } from '../utils/array';
import type { VComponent, WithHtml } from './component';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';

function buildPlaceholderComment() {
  const commentText = `placeholder--${crypto.randomUUID()}`;
  const comment = document.createComment(commentText);
  return comment;
}

// TODO: refactor this to use switchComponent
class ConditionallyRenderedComponent implements VComponent {
  constructor(
    private condition: MaybeReactive<boolean>,
    private cmp: VComponent,
    private fallback?: VComponent
  ) {}

  readonly __type = 'V_COMPONENT';
  private _html!: MaybeArray<HTMLElement | Comment>;
  get html() {
    return this._html;
  }
  renderOnce() {
    if (toValue(this.condition)) {
      this._html = this.cmp.renderOnce();
      this.fallback?.destroy?.();
      return this._html;
    }

    this.cmp.destroy?.();

    if (!this.fallback) {
      this._html = buildPlaceholderComment();
      return this._html;
    }

    this._html = this.fallback.renderOnce();
    return this._html;
  }

  private _initChild(parent: WithHtml) {
    if (toValue(this.condition)) this.cmp.init(parent);
    else if (this.fallback) this.fallback.init(parent);
  }

  classes?: AddClassesArgs;
  addClass(args: AddClassesArgs) {
    this.classes = args;
    return this;
  }

  private subs = new Subscription();

  init(parent: WithHtml) {
    if (!isReactive(this.condition)) return;

    const sub = this.condition.valueChanges$.subscribe(() => {
      const oldNodes = this._html;

      const newNodes = this.renderOnce();

      removeOldNodesAndRenderNewNodes({
        oldNodes,
        newNodes,
        parent,
      });

      this._initChild(parent);
    });

    this.subs.add(sub);

    if (!this.classes) return;

    this.cmp.addClass(this.classes);
    this.fallback?.addClass?.(this.classes);
  }

  destroy(): void {
    this.subs.unsubscribe();
    this.cmp.destroy?.();
    this.fallback?.destroy?.();
  }

  else(fallback: VComponent) {
    return new ConditionallyRenderedComponent(
      this.condition,
      this.cmp,
      fallback
    );
  }
}

export const when = (condition: MaybeReactive<boolean>) => ({
  render: (cmp: VComponent) =>
    new ConditionallyRenderedComponent(condition, cmp),
});
