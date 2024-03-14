import { MaybeReactive, isReactive, toValue } from './reactive';
import { Component } from './render';

export const show = (cmp: Component) => {
  return {
    when: (when: MaybeReactive<boolean>) => {
      const sources = isReactive(when) ? [when] : [];

      const elseFn = (fallback: Component): Component => ({
        renderFn: () => (toValue(when) ? cmp.renderFn() : fallback.renderFn()),
        sources,
        __isComponent: true,
      });

      return {
        else: elseFn,
        renderFn: () => (toValue(when) ? cmp.renderFn() : null),
        __isComponent: true,
        sources,
      } satisfies Component & { else: typeof elseFn };
    },
  };
};
