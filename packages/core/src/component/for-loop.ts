import { MaybeReactive } from '../reactive';
import { Component, ForLoopComponent, SimpleComponent } from '../render';

export function forLoopRender<T>(
  items: MaybeReactive<T[]>,
  componentFn: (item: T) => SimpleComponent
) {
  return {
    items,
    componentFn,
    __type: 'for-loop',
  } satisfies ForLoopComponent<T>;
}
