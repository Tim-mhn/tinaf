// @ts-nocheck
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentFn } from '../component';
import { button2, div2, img2, input2, li2, span2, ul2 } from '../dom';

declare global {
  module JSX {
    type IntrinsicElements = Record<
      keyof HTMLElementTagNameMap,
      Record<string, any>
    >;
  }
}

const domComponentMap = {
  div: div2,
  button: button2,
  input: input2,
  img: img2,
  li: li2,
  ul: ul2,
  span: span2,
};
export const jsxComponent = (
  componentFn: string | ComponentFn,
  extendedProps: Record<string, any> | null,
  ..._children: any[]
) => {
  // TODO: unify API for classes.
  // We have 'classes' for dom elements and 'className' for components
  const { className, onClick, ...props } = extendedProps || {};

  if (typeof componentFn === 'string' && componentFn in domComponentMap) {
    const domComponent =
      domComponentMap[componentFn as keyof typeof domComponentMap];

    console.log(extendedProps);
    return domComponent({
      ...props,
      children: _children,
      classes: className,
      handlers: { click: onClick },
    });
  }

  if (typeof componentFn === 'string') {
    throw new Error(`Component ${componentFn} not yet supported`);
  }

  const children = _children || [];

  const component = componentFn({
    ...props,
    className,
    children: children,
  });

  console.groupEnd();

  return component;
};
