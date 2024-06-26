import type { MaybeReactive } from '../reactive';
import type { VComponent } from './component';

export function isVComponent(
  cmp: VComponent | MaybeReactive<any> | HTMLElement | Comment
): cmp is VComponent {
  return (
    cmp &&
    typeof cmp === 'object' &&
    '__type' in cmp &&
    cmp.__type === 'V_COMPONENT'
  );
}
