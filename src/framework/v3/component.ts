import { div } from './dom/dom-element';
import { clearReactives, getReactives } from './reactive';
import { Component, DynamicComponent } from './types';
export type ComponentFnInput = () => ReturnType<DynamicComponent>['renderFn'];

export function _component(cmp: ComponentFnInput): Component {
  function cmpAndStoreReactives() {
    clearReactives();
    const renderFn = cmp();
    const rxs = getReactives();
    return { renderFn, reactives: [...rxs] };
  }

  return cmpAndStoreReactives;
}

export function componentWithProps<Props extends object>(
  propsToOutput: (props: Props) => ReturnType<ComponentFnInput>
): (props: Props) => Component {
  return (props: Props) => _component(() => propsToOutput(props));
}

export function componentWithPropsBis<Props extends object>(
  propsToOutput: (props: Props) => ReturnType<ComponentFnInput>
): (props: Props) => Component {
  return function (props: Props) {
    return _component(() => propsToOutput(props));
  };
}

type WithPropsComponentFn<Props extends object> = (
  p: Props
) => ReturnType<ComponentFnInput>;

type Input = WithPropsComponentFn<any> | ComponentFnInput;
type Output<T extends WithPropsComponentFn<any> | ComponentFnInput> =
  T extends ComponentFnInput
    ? Component
    : T extends WithPropsComponentFn<infer P>
    ? (p: P) => Component
    : never;

export function component<Fn extends Input>(fn: Fn): Output<Fn> {
  return function cmp(p: any) {
    if (arguments.length === 0)
      return (<DynamicComponent>_component(<any>fn))();

    return componentWithProps(<any>fn)(<any>p);
  } as any;
}
