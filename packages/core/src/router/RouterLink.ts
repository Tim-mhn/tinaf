import { toValue } from '../reactive';
import { component } from '../component';
import { a } from '../dom';
import { injectRouter } from './inject';
import type { AddClassesArgs } from '../dom/create-dom-element';

// TODO: allow a special class input
export const RouterLink = component<{ to: string; classes?: AddClassesArgs }>(
  ({ to, classes, children = [] }) => {
    const router = injectRouter();

    return a(...children)
      .on({
        click: (e) => {
          e?.preventDefault();
          router.navigate(toValue(to));
        },
      })
      .addClass(toValue(classes) || {});
  }
);
