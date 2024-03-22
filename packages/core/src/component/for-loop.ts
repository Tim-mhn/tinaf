import { div } from '../dom/dom';
import { MaybeReactive, isReactive, toValue } from '../reactive';
import {
  Component,
  ForLoopComponent,
  SimpleComponent,
  safeRenderHtml,
} from '../render';
import { watchList } from '../reactive/watch-list';

// export function forLoopRender<T>(
//   items: MaybeReactive<T[]>,
//   componentFn: (item: T) => Component
// ): Component {
//   const sources = isReactive(items) ? [items] : [];
//   /**
//    * step1 : wrap everything around a div. Rerender everything on any change in the list
//    */

//   /**
//    * Proposition: forLoopRender
//    *
//    * watchForLoopSources(sources).subscribe(newValues: Array<{ value: T, index: number, isNew: boolean}> => {
//    *
//    *
//    *
//    *   const child = parent.childNodes[index]
//    *   if (!isNew) parent.removeChild(child);
//    *   const newChild = renderFn(value);
//    *   parent.insertBefore(node, [...parent.childNodes][index])
//    * })
//    *
//    *
//    * NOTE: + need to use unique key to avoid useless rerenders
//    *
//    */

//   return {
//     __isSimpleComponent: true,
//     sources: sources.length > 0 ? sources : undefined,
//     renderFn: () => {
//       console.count('rerendering list');
//       const children = toValue(items).map((item) => componentFn(item));

//       return div(...children).renderFn();
//     },
//   };
// }

/**
 * TODO:
 * - integrate this piece of logic in the render function
 * - Make it work with components inside forLoop which have internal state and can be updated
 * - Check if we indeed do not need to update the DOM for changed index elements
 *
 */
export function forLoopRenderV2<T>(
  items: MaybeReactive<T[]>,
  componentFn: (item: T) => SimpleComponent
) {
  return {
    items,
    componentFn,
    __type: 'for-loop',
  } satisfies ForLoopComponent<T>;
}

export function renderForLoop<T>(
  component: ReturnType<typeof forLoopRenderV2<T>>,
  parent: HTMLElement
) {
  console.log({ parent });

  const { componentFn, items } = component;

  const children = toValue(items).map((i) =>
    safeRenderHtml(componentFn(i).renderFn)
  );
  parent.append(...children);

  if (!isReactive(items)) return parent;

  watchList(items).subscribe((changes) => {
    const childrenToRemove = changes
      .filter(({ change }) => change === 'removed')
      .map(({ index, value }) => {
        console.log('Removing child ', value);
        return parent.childNodes[index];
      });

    childrenToRemove.forEach((child) => parent.removeChild(child));

    const childrenToAdd = changes
      .filter(({ change }) => change === 'added')
      .sort((a, b) => b.index - a.index);

    childrenToAdd.forEach(({ value, index }) => {
      const child = safeRenderHtml(componentFn(value).renderFn);
      console.log('Adding child ', value);
      parent.insertBefore(child, [...parent.childNodes][index]);
    });
  });

  return parent;
}
