/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subscription } from 'rxjs';
import { type MaybeReactive, isReactive, toValue } from '../reactive';
import { watchList } from '../reactive/watch-list';
import { toArray, type MaybeArray } from '../utils/array';
import type { VComponent, WithHtml } from './component';
import { isVComponent } from './is-component';
import { SimpleVComponent, component, type ComponentFn } from './v-component';
import type { AddClassesArgs } from '../dom/create-dom-element';
import type { T } from 'vitest/dist/reporters-yx5ZTtEV.js';

class ForLoopComponent<T> implements VComponent {
  constructor(
    private items: MaybeReactive<T[]>,
    private renderFn: (item: T) => HTMLElement | Comment | VComponent,
    private keyFunction: (item: T) => string | number
  ) {}

  readonly __type = 'V_COMPONENT';
  private _html!: (HTMLElement | Comment)[];
  get html() {
    return this._html;
  }

  private _renderChildHtmlAndInit(
    value: T,
    parent: WithHtml
  ):
    | {
        html: MaybeArray<HTMLElement | Comment>;
        vnode: VComponent;
        key: string | number;
      }
    | { html: MaybeArray<HTMLElement | Comment>; vnode: null; key: null } {
    const child = this.renderFn(value);
    if (isVComponent(child)) {
      (child as any as SimpleVComponent).init(parent);
      return {
        html: child.renderOnce(),
        vnode: child,
        key: this.keyFunction(value),
      };
    }
    return {
      html: child,
      vnode: null,
      key: null,
    };
  }

  private _renderChildrenAndInit() {
    const htmlElementsAndVNodes = toValue(this.items)
      .map((item) => this._renderChildHtmlAndInit(item, this.parent))
      .flat();

    const newHtml = htmlElementsAndVNodes.map(({ html }) => html).flat();
    const vnodesWithKeys = htmlElementsAndVNodes
      .filter(({ vnode }) => isVComponent(vnode))
      .map(
        ({ vnode, key }) =>
          ({ vnode, key } as { vnode: VComponent; key: string | number })
      );

    return { newHtml, vnodesWithKeys };
  }

  private vnodes: Record<string | number, VComponent> = {};

  renderOnce() {
    try {
      const { newHtml, vnodesWithKeys } = this._renderChildrenAndInit();
      this._html = newHtml;
      vnodesWithKeys.forEach(({ key, vnode }) => {
        this._registerVNode(vnode, { key });
      });

      return newHtml;
    } catch (err) {
      console.error(err);
      throw new Error('error in renderOnce');
    }
  }

  addClass(args: AddClassesArgs): VComponent {
    console.warn('[TINAF] addClass has no effect in a forLoop component');
    return this;
  }

  private parent!: WithHtml;

  private sub = new Subscription();

  private _destroyVNode(value: T) {
    const key = this.keyFunction(value);
    const vnode = this.vnodes[key];

    if (vnode) vnode.destroy?.();
    delete this.vnodes[key];
  }

  private _registerVNode(
    vnode: VComponent | undefined,
    { key }: { key: string | number }
  ) {
    if (vnode) this.vnodes[key] = vnode;
  }

  init(parent: WithHtml) {
    this.parent = parent;
    if (!isReactive(this.items)) return;

    const updateUiSub = watchList(this.items).subscribe((changes) => {
      const childrenToRemove = changes
        .filter(({ change }) => change === 'removed')
        .map(({ index, value }) => {
          this._destroyVNode(value);

          return parent.html.childNodes[index];
        });

      childrenToRemove.forEach((child) => parent.html.removeChild(child));

      const childrenToAdd = changes
        .filter(({ change }) => change === 'added')
        .sort((a, b) => b.index - a.index);

      childrenToAdd.forEach(({ value, index: childIndex }) => {
        const { html } = this._renderChildHtmlAndInit(value, this.parent);

        toArray(html).forEach((childHtml, index) =>
          parent.html.insertBefore(
            childHtml,
            [...parent.html.childNodes][childIndex + index + 1]
          )
        );
      });
    });

    this.sub.add(updateUiSub);
  }

  destroy(): void {
    this.sub.unsubscribe();
  }
}

const forLoop = <T>(
  items: MaybeReactive<T[]>,
  renderFn: (item: T) => HTMLElement | Comment | VComponent,
  keyFunction: (item: T) => string | number = (item) => JSON.stringify(item)
) => new ForLoopComponent(items, renderFn, keyFunction);
// TODO: <For> is an interface for the forLoop component. Maybe we could drop entirely forLoop
/**
 * Creates a list of elements from a reactive list
 */
export function For<T>({
  each,
  keyFunction,
  children,
}: {
  each: MaybeReactive<T[]>;
  keyFunction?: (item: T) => string | number;
  children?: [(item: T) => HTMLElement | Comment | VComponent];
}) {
  const [renderFn] = children || [];

  if (!renderFn)
    throw new Error('[TINAF] <For /> component is missing renderFn ');

  return forLoop(each, renderFn, keyFunction);
}
