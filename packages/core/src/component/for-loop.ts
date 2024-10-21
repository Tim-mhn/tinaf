/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subscription } from 'rxjs';
import { type MaybeReactive, isReactive, toValue } from '../reactive';
import { watchList } from '../reactive/watch-list';
import { toArray, type MaybeArray } from '../utils/array';
import type { HTML, TinafElement, VComponent, WithHtml } from './component';
import { isVComponent } from './is-component';
import { SimpleVComponent, component, type ComponentFn } from './v-component';
import type { AddClassesArgs } from '../dom/create-dom-element';
import { logger } from '../common';

class ForLoopComponent<T> implements VComponent {
  constructor(
    private items: MaybeReactive<T[]>,
    private renderFn: (item: T) => TinafElement,
    private keyFunction: (item: T) => string | number
  ) {}

  readonly __type = 'V_COMPONENT';
  readonly __subtype = 'For';

  private _html!: HTML[];
  get html() {
    return this._html;
  }

  private _renderChildHtmlAndInit(
    value: T,
    parent: WithHtml
  ):
    | {
        html: MaybeArray<HTML>;
        vnode: VComponent;
        key: string | number;
      }
    | { html: MaybeArray<HTML>; vnode: null; key: string | number } {
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
      key: this.keyFunction(value),
    };
  }

  private _renderChildrenAndInit() {
    const htmlElementsAndVNodes = toValue(this.items)
      .map((item) => this._renderChildHtmlAndInit(item, this.parent))
      .flat();

    const newHtml = htmlElementsAndVNodes.map(({ html }) => html).flat();
    const childVNodes = htmlElementsAndVNodes.map(({ key, vnode }) => ({
      key,
      isVNode: isVComponent(vnode),
      vnode,
    }));
    return { newHtml, childVNodes };
  }

  private vnodes: Record<string | number, VComponent | null | undefined> = {};

  renderOnce() {
    try {
      const { newHtml, childVNodes } = this._renderChildrenAndInit();
      this._html = newHtml;

      childVNodes.forEach(({ key, vnode }) => {
        this._registerVNode(vnode, { key });
      });

      return newHtml;
    } catch (err) {
      throw new Error('error in renderOnce');
    }
  }

  addClass(args: AddClassesArgs): VComponent {
    console.warn('[TINAF] addClass has no effect in a forLoop component');
    return this;
  }

  parent!: WithHtml;

  private sub = new Subscription();

  private _destroyVNode(value: T) {
    const key = this.keyFunction(value);
    const vnode = this.vnodes[key];

    if (vnode) vnode.destroy?.();
    delete this.vnodes[key];
  }

  private _registerVNode(
    vnode: VComponent | null | undefined,
    { key }: { key: string | number }
  ) {
    this.vnodes[key] = vnode;
  }

  private _vNodeExists(value: T) {
    const key = this.keyFunction(value);
    return key in this.vnodes;
  }

  init(parent: WithHtml) {
    console.group(`<For>.init`);
    this.parent = parent;

    if (!isReactive(this.items)) return;

    const updateUiSub = watchList(this.items).subscribe((changes) => {
      const childrenToRemove = changes
        .filter(
          ({ change, value }) =>
            change === 'removed' && this._vNodeExists(value)
        )
        .map(({ index, value }) => {
          this._destroyVNode(value);

          return parent.html.childNodes[index];
        });

      childrenToRemove.forEach((child) => {
        try {
          parent.html.removeChild(child);
        } catch (err) {
          logger.warn(`[<For />] Error removing child ${child?.textContent}`);
        }
      });

      const childrenToAdd = changes
        .filter(({ change }) => change === 'added')
        .sort((a, b) => b.index - a.index);

      childrenToAdd.forEach(({ value, index: childIndex }) => {
        const { html } = this._renderChildHtmlAndInit(value, this.parent);

        toArray(html).forEach((childHtml, index) =>
          parent.html.insertBefore(
            childHtml,
            [...parent.html.childNodes][childIndex + index]
          )
        );
      });
    });

    this.sub.add(updateUiSub);

    console.groupEnd();
  }

  destroy(): void {
    Object.keys(this.vnodes).forEach((nodeKey) => {
      const vnode = this.vnodes[nodeKey];
      vnode?.destroy?.();
      delete this.vnodes[nodeKey];
    });
    this.sub.unsubscribe();
  }
}

const forLoop = <T>(
  items: MaybeReactive<T[]>,
  renderFn: (item: T) => TinafElement,
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
  children?: [(item: T) => TinafElement];
}) {
  const [renderFn] = children || [];

  if (!renderFn)
    throw new Error('[TINAF] <For /> component is missing renderFn ');

  return forLoop(each, renderFn, keyFunction);
}
