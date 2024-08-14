import type { ReactiveValue } from './reactive';
import { watchAllSources } from './watch';

console.log('foo');

export function effect<T>(callbackFn: () => void, sources: ReactiveValue<T>[]) {
  const sub = watchAllSources(sources).subscribe(() => callbackFn());

  return () => sub.unsubscribe();
}
