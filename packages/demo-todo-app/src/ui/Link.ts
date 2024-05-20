import { component } from 'tinaf/component';
import { RouterLink } from 'tinaf/router';

export const Link = component<{ to: string }>(({ to, children = [] }) => {
  return RouterLink({
    to,
    children,
    classes: 'underline font-semibold cursor-pointer text-slate-800',
  });
});
