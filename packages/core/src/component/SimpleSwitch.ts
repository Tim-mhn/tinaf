/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  buildSwitchComponent,
  component,
  type ComponentFn,
  type VComponent,
} from '.';
import type { PrimitiveType } from '../utils/primitive';
import { isVComponent } from './is-component';

// TODO: fix types here

type ComponentProps<T extends object> = Parameters<ComponentFn<T>>[0];

export function Match<T extends PrimitiveType>(
  props: ComponentProps<{ when: T }>
) {
  //@ts-expect-error
  const componentFn = component<{ when: T }>(({ children }) => {
    return children;
  });

  return componentFn(props);
}

export function Switch<T extends PrimitiveType>(
  props: ComponentProps<{ condition: T; fallback?: VComponent }>
) {
  const componentFn = component<{ condition: T; fallback?: VComponent }>(
    ({ children, condition, fallback }) => {
      // TODO: fix types here
      //@ts-expect-error
      return buildSwitchComponent(condition, (value) => {
        for (const child of children || []) {
          if (!isVComponent(child)) return;

          const childMatchesCondition =
            'props' in child &&
            !!child.props &&
            typeof child.props === 'object' &&
            'when' in child.props &&
            child.props.when === value;

          // TODO: need to add props as type of VComponent ?
          if (childMatchesCondition) {
            return child;
          }
        }

        return fallback;
      });
    }
  );

  return componentFn(props);
}
