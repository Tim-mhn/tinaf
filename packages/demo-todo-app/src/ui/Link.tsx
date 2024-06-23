import {  componentV2 } from 'tinaf/component';
import {  RouterLink } from 'tinaf/router';

export const Link = componentV2<{ to: string }>(({ to, children = [] }) => {
  // RouterLink({
  //   to,
  //   children,
  //   classes: 'underline font-semibold cursor-pointer text-slate-800',
  // });

  return <RouterLink to={to} className="underline font-semibold cursor-pointer text-slate-800">
    {children}
    </RouterLink>
})