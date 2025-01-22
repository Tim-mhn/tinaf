import {
  computed,
  Reactive,
  toValue,
  xequal,
  xif,
  type ReactiveValue,
} from '../reactive';
import { component } from '../component';
import { a } from '../dom';
import { injectRouter } from './inject';
import type { AddClassesArgs } from '../dom/create-dom-element';

const reactiveProp = <T extends object, K extends keyof T>(
  rx: ReactiveValue<T>,
  key: K
) => {
  return computed(() => toValue(rx)[key]);
};
// TODO: allow a special class input
export const RouterLink = component<{
  to: string;
  activeClass?: string;
  classes?: AddClassesArgs;
}>(({ to, classes, activeClass, children = [] }) => {
  const router = injectRouter();

  const routePath = reactiveProp(router.route, 'path');

  const onRouteActiveCls = xif(xequal(routePath, to))
    .xthen(activeClass)
    .xelse('');

  return a(...children)
    .on({
      click: (e) => {
        e?.preventDefault();
        router.navigate(toValue(to));
      },
    })
    .addClass(onRouteActiveCls)
    .addClass(toValue(classes) || {});
});
