import { MaybeReactive } from '../../reactive';
import { ComponentV2 } from './component';

export function isV2Component(
  cmp: ComponentV2 | MaybeReactive<any> | HTMLElement | Comment
): cmp is ComponentV2 {
  return (
    cmp &&
    typeof cmp === 'object' &&
    '__type' in cmp &&
    cmp.__type === 'componentV2'
  );
}
