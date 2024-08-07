import type { MaybeReactive } from '../reactive';
import type { VComponent } from './component';

export function isVComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cmp: VComponent | MaybeReactive<any> | HTMLElement | Comment
): cmp is VComponent {
  return (
    cmp &&
    typeof cmp === 'object' &&
    '__type' in cmp &&
    cmp.__type === 'V_COMPONENT'
  );
}
