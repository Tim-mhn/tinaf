import { button2, div2 } from '../dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsxComponent = (...args: any[]) => {
  const [componentFn, extendedProps, ..._children] = args;

  console.log(args);

  const { className, onClick, ...props } = extendedProps || {};

  console.log({ className });

  if (componentFn === 'div') {
    return div2({ children: _children, classes: className });
  }

  if (componentFn === 'button') {
    return button2({
      children: _children,
      classes: className,
      handlers: {
        click: onClick,
      },
    });
  }

  const children = _children || [];

  const component = componentFn({
    ...props,
    children: children,
  });
  if (className) return component.addClass(className);

  return component;
};
