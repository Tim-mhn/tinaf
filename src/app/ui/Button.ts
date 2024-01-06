import { component } from '../../framework/v3/component';
import { button } from '../../framework/v3/dom/button';

export const Button = component(
  ({
    children,
    options,
  }: {
    children: Parameters<typeof button>[0];
    options?: Parameters<typeof button>[1];
  }) => {
    return () =>
      button(children, {
        ...options,
        class:
          'border rounded-md text-white border-blue-900 p-2 bg-blue-800 hover:bg-blue-900 rounded-sm ',
      });
  }
);
