import { MaybeReactive, isReactive, toValue } from '../reactive';
import { Component, SimpleComponent } from '../render';

export const show = (cmp: SimpleComponent) => {
  return {
    when: (when: MaybeReactive<boolean>) => {
      const sources = isReactive(when) ? [when] : [];

      const elseFn = (fallback: SimpleComponent): SimpleComponent => ({
        renderFn: () => (toValue(when) ? cmp.renderFn() : fallback.renderFn()),
        sources,
        __type: 'component',
      });

      return {
        else: elseFn,
        renderFn: () => (toValue(when) ? cmp.renderFn() : null),
        __type: 'component',
        sources,
      } satisfies Component & { else: typeof elseFn };
    },
  };
};
