import { MaybeReactiveProps } from '../reactive/types';
import { Component, SimpleComponent } from '../render';

export function component(
  fn: () => HTMLElement | SimpleComponent | string
): SimpleComponent {
  return {
    renderFn: fn,
    __type: 'component',
  };
}

export const componentWithProps =
  <
    Props extends object,
    Actions extends Record<string, (...params: any[]) => any> = {},
    Children extends string[] = []
  >(
    fn: (
      p: MaybeReactiveProps<Props> &
        Actions &
        Record<Children[number], SimpleComponent | string>
    ) => HTMLElement | SimpleComponent | string
  ) =>
  (
    props: MaybeReactiveProps<Props> &
      Actions &
      Record<Children[number], SimpleComponent | string>
  ) =>
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
