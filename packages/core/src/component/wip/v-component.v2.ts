import { button, div } from '../../dom/dom';
import { ReactiveValue } from '../../reactive';
import { watchAllSources } from '../../reactive/watch';
import {
  Component,
  RenderFn,
  SimpleComponent,
  hasSources,
  isComponent,
  isForLoopComponent,
} from '../../render';
import { MaybeArray } from '../../utils/array';
import { component } from '../component';
import { ComponentV2, WithHtml } from './component';
import { isV2Component } from './isComponent';
import { removeOldNodesAndRenderNewNodes } from './render-new-nodes';

export class VComponent implements ComponentV2 {
  constructor(
    public renderFn: () => HTMLElement | Comment | ComponentV2,
    public sources?: ReactiveValue<any>[]
  ) {}

  readonly __type = 'componentV2';

  child!: HTMLElement | Comment | ComponentV2;
  html!: MaybeArray<HTMLElement | Comment>;
  parent!: WithHtml;

  init(parent: WithHtml) {
    this.parent = parent;
    this.child = this.renderFn();
    debugger;
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isV2Component(this.child)) {
      (this.child as any as VComponent).init(this.parent);
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

    if (isV2Component(this.child)) {
      const html = this.child.renderOnce();
      this.html = html;
      return html;
    }

    throw new Error('path way not supported in renderOnce');
  }
}

export function vcomponent(
  renderFn: () => HTMLElement | Comment | ComponentV2
) {
  return new VComponent(renderFn);
}
