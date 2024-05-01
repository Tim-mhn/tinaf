import { combineLatest, filter, skip, startWith } from 'rxjs';
import { ReactiveValue } from './reactive';

export function watchAllSources(sources: ReactiveValue<any>[]) {
  return combineLatest(
    sources.map((s) => s.valueChanges$.pipe(startWith('')))
  ).pipe(skip(1));
}
