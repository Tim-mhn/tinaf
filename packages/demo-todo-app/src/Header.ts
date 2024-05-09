import { component } from 'tinaf/component';
import { div } from 'tinaf/dom';

// @ts-expect-error
export const Header = component(() => {
  return div('Groceries list ').addClass(
    'flex text-2xl font-semibold border-b border-b-primary p-4 h-16'
  );
});
