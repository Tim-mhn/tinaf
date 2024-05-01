import { tap } from 'rxjs';
import { MaybeReactive, isReactive, toValue } from '../reactive';
import { watchList } from '../reactive/watch-list';
import { toArray } from '../utils/array';
import { VComponent, WithHtml } from './component';
import { isVComponent } from './isComponent';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';
import { SimpleVComponent } from './v-component.v2';

class ForLoopComponent<T> implements VComponent {
  constructor(
    private items: MaybeReactive<T[]>,
    private renderFn: (item: T) => HTMLElement | Comment | VComponent
  ) {}

  readonly __type = 'V_COMPONENT';
  private _html!: (HTMLElement | Comment)[];
  get html() {
    return this._html;
  }

  private _renderChildHtmlAndInit(value: T, parent: WithHtml) {
    const child = this.renderFn(value);
    if (isVComponent(child)) {
      (child as any as SimpleVComponent).init(parent);
      return child.renderOnce();
    }
    return child;
  }

  renderOnce() {
    try {
      const newHtml = toValue(this.items)
        .map((item) => this._renderChildHtmlAndInit(item, this.parent))
        .flat();

      this._html = newHtml;

      return newHtml;
    } catch (err) {
      console.error(err);
      console.log(this);
      throw new Error('error in renderOnce');
    }
  }

  private parent!: WithHtml;
  init(parent: WithHtml) {
    this.parent = parent;
    if (!isReactive(this.items)) return;

    watchList(this.items)
      .pipe(tap((c) => console.log(c)))
      .subscribe((changes) => {
        const childrenToRemove = changes
          .filter(({ change }) => change === 'removed')
          .map(({ index, value }) => {
            console.debug('Removing child ', value);
            return parent.html.childNodes[index];
          });

        childrenToRemove.forEach((child) => parent.html.removeChild(child));

        const childrenToAdd = changes
          .filter(({ change }) => change === 'added')
          .sort((a, b) => b.index - a.index);

        childrenToAdd.forEach(({ value, index: childIndex }) => {
          const childrenHtml = this._renderChildHtmlAndInit(value, this.parent);
          console.debug('Adding child ', value);
          toArray(childrenHtml).forEach((childHtml, index) =>
            parent.html.insertBefore(
              childHtml,
              [...parent.html.childNodes][childIndex + index + 1]
            )
          );
        });
      });
  }
}

export const forLoop = <T>(
  items: MaybeReactive<T[]>,
  renderFn: (item: T) => HTMLElement | Comment | VComponent
) => new ForLoopComponent(items, renderFn);
