import { button, div } from '../dom/dom';
import { ReactiveValue } from '../reactive';
import { watchAllSources } from '../reactive/watch';
import { hasSources, isComponent, isForLoopComponent } from '../render';
import { MaybeArray } from '../utils/array';
import { VComponent, WithHtml } from './component';
import { isVComponent } from './isComponent';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';

export class SimpleVComponent implements VComponent {
  constructor(
    public renderFn: () => HTMLElement | Comment | VComponent,
    public sources?: ReactiveValue<any>[]
  ) {}

  readonly __type = 'V_COMPONENT';

  child!: HTMLElement | Comment | VComponent;
  html!: MaybeArray<HTMLElement | Comment>;
  parent!: WithHtml;

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn();
    debugger;
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isVComponent(this.child)) {
      (this.child as any as SimpleVComponent).init(this.parent);
    } else {
      this.html = this.child;
    }

    if (!hasSources(this.sources)) return;

    watchAllSources(this.sources).subscribe(() => {
      const oldNodes = this.html;

      this.html = this.renderOnce();

      removeOldNodesAndRenderNewNodes({
        newNodes: this.html,
        oldNodes,
        parent,
      });
    });
  }

  renderOnce(): MaybeArray<HTMLElement | Comment> {
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isVComponent(this.child)) {
      const html = this.child.renderOnce();
      this.html = html;
      return html;
    }

    throw new Error('path way not supported in renderOnce');
  }
}

export function vcomponent(renderFn: () => HTMLElement | Comment | VComponent) {
  return new SimpleVComponent(renderFn);
}
