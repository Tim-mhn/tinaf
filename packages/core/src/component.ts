import { MaybeReactiveProps } from './reactive/types';
import { Component } from './render';

export function component(fn: () => HTMLElement | Component): Component {
  return {
    renderFn: fn,
    __isComponent: true,
  };
}

export const componentWithProps =
  <Props extends object>(
    fn: (p: MaybeReactiveProps<Props>) => HTMLElement | Component
  ) =>
  (props: MaybeReactiveProps<Props>) =>
    component(() => fn(props));

/**
 *
 * const Card = componentWithProps<{ title : string, subtitle: string}>(( { title, subtitle}) => {
 *          return div(div(title), div(subtitle))
 * })
 *
 *
 * const App = cmp(() => {
 *
 *
 * const title = rx("hello")
 * const subtitle = rx("there")
 *    return div(
 *      Card({ title, subtitle}),
 *      Button()
 *   )
 * })
 */
