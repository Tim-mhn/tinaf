import { MaybeReactive, isReactive, reactive, toValue } from '../../reactive';
import { ComponentV2, WithHtml } from './component';

function buildPlaceholderComment() {
  const commentText = `placeholder--${crypto.randomUUID()}`;
  const comment = document.createComment(commentText);
  return comment;
}

class ConditionallyRenderedComponent implements ComponentV2 {
  constructor(
    private condition: MaybeReactive<boolean>,
    private cmp: ComponentV2,
    private fallback?: ComponentV2
  ) {}

  readonly __type = 'componentV2';
  private _html!: HTMLElement | Comment;
  get html() {
    return this._html;
  }
  renderOnce() {
    if (toValue(this.condition)) {
      this._html = this.cmp.renderOnce();
      return this._html;
    }

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
  init(parent: WithHtml) {
    if (!isReactive(this.condition)) return;

    this.condition.valueChanges$.subscribe(() => {
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      parent.html.removeChild(this.html);
      this._html = this.renderOnce();
      parent.html.insertBefore(this.html, [...parent.html.childNodes][index]);
      this._initChild(parent);
    });
  }

  else(fallback: ComponentV2) {
    return new ConditionallyRenderedComponent(
      this.condition,
      this.cmp,
      fallback
    );
  }
}

export const when = (condition: MaybeReactive<boolean>) => ({
  render: (cmp: ComponentV2) =>
    new ConditionallyRenderedComponent(condition, cmp),
});
