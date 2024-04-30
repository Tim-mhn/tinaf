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
  isSimpleComponent,
  render,
  safeRenderHtml,
  safeRenderHtmlOrComponent,
} from '../../render';
import { component } from '../component';
import { ComponentV2, WithHtml } from './component';
import { isV2Component } from './isComponent';

function renderOneLevelDeep(
  renderFn: RenderFn
): Component | HTMLElement | Comment {
  return safeRenderHtmlOrComponent(renderFn);
}

function renderToHtml(renderFn: RenderFn): HTMLElement | Comment {
  return safeRenderHtml(renderFn);
}

export class VComponent implements ComponentV2 {
  constructor(
    public renderFn: () => HTMLElement | Comment | ComponentV2,
    public sources?: ReactiveValue<any>[],
    private name: string = ''
  ) {}

  readonly __type = 'componentV2';

  child!: HTMLElement | Comment | ComponentV2;
  html!: HTMLElement | Comment;
  parent!: WithHtml;

  setName(name: string) {
    this.name = name;
    return this;
  }

  init(parent: WithHtml) {
    // console.group('Initialising: ', this.name);
    // console.log(this);
    this.parent = parent;
    this.child = this.renderFn();
    // this.child = renderOneLevelDeep(this.renderFn);
    debugger;
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isV2Component(this.child)) {
      // console.info('Calling init from VComponent');

      (this.child as any as VComponent).init(this.parent);
      //   this.html = renderToHtml(this.renderFn);
      //   debugger;
    } else {
      this.html = this.child;
      //   debugger;
    }

    // console.groupEnd();

    if (!hasSources(this.sources)) return;

    watchAllSources(this.sources).subscribe(() => {
      // console.log('Updating ', this.name);
      debugger;
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      parent.html.removeChild(this.html);
      this.html = this.renderOnce(); // renderToHtml(this.renderFn);
      parent.html.insertBefore(this.html, [...parent.html.childNodes][index]);
    });
  }

  renderOnce(): HTMLElement | Comment {
    // console.group('renderOnce');
    // console.log(this.child);
    // console.groupEnd();
    if (isForLoopComponent(this.child))
      throw new Error('for loop component not supported');

    if (isV2Component(this.child)) {
      const html = this.child.renderOnce();
      this.html = html;
      return html;
    }

    throw new Error('path way not supported in renderOnce');
    // this.html = renderOneLevelDeep(this.renderFn) as HTMLElement | Comment;
    // return this.html;
  }
}

export function vcomponent(
  renderFn: () => HTMLElement | Comment | ComponentV2
) {
  return new VComponent(renderFn);
}
