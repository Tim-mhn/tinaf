import { div } from './dom-element';
import { clearReactives, getReactives } from './reactive';
import { Component, ComponentOutput, DynamicComponent } from './types';
export type ComponentFnInput = () => ReturnType<DynamicComponent>['renderFn'];

function _component(cmp: ComponentFnInput): Component {
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
    if (arguments.length === 0) return (<DynamicComponent>component(<any>fn))();

    return componentWithProps(<any>fn)(<any>p);
  } as any;
}

/**
 *
 * @param anotherFn
 * @returns
 *
 *
 * function component(fn: (props?) => ComponentFn): {
 *   return function ( args ?) {
 *
 *     if arguments.length == 0 return component(fn)()
 *
 *     return componentWithProps(args)()
 *
 *   }
 *
 * }
 *
 *
 *
 * })
 */

type O = () => { name: string };

function _build(fn: () => string): O {
  return () => ({
    name: fn(),
  });
}

function buildWithProps<Props extends object>(
  fn: (p: Props) => string
): (p: Props) => O {
  return (p: Props) => () => ({
    name: fn(p),
  });
}

const Header = _build(() => 'Header');

console.log(Header());

const CmpWithProps = buildWithProps<{ age: number; name: string }>(
  ({ age, name }) => {
    return `${age} - ${name}`;
  }
);

const Cmp = CmpWithProps({ age: 10, name: 'tim' });

console.log(Cmp());

function build<Props extends object | void>(
  fn: (p: Props extends void ? void : Props) => string
) {
  return function switchBuild(p: Props) {
    console.log(arguments.length);
    if (arguments.length === 0) {
      return _build(<any>fn)();
    } else {
      return buildWithProps(<any>fn)(<any>p);
    }
  };
}

const HeaderBis = build(() => 'header');
console.log(HeaderBis());

const CmpBis = build<{ age: number; name: string }>(({ age, name }) => {
  return `${age} - ${name}`;
}) as any;

console.log(CmpBis({ age: 30, name: 'bob' })());
