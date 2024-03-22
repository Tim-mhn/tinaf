import { Observable, map, pairwise, startWith } from 'rxjs';
import { toValue } from './toValue';
import { Reactive, ReactiveValue } from './reactive';

type WatchListItem<T> = {
  index: number;
  value: T;
  change: 'added' | 'removed' | 'changedIndex';
};
export type WatchList<T> = Array<WatchListItem<T>>;

function findElements<T>({
  inArray,
  butNotIn,
}: {
  inArray: T[];
  butNotIn: T[];
}) {
  return inArray
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => !butNotIn.includes(value));
}
export function watchList<T>(
  list: ReactiveValue<T[]>
): Observable<WatchList<T>> {
  return list.valueChanges$.pipe(
    startWith(toValue(list)),
    pairwise(),
    map((pair) => {
      const [previous, current] = pair;

      const newElements: WatchList<T> = findElements({
        inArray: current,
        butNotIn: previous,
      }).map(({ value, index }) => ({ value, index, change: 'added' }));

      const removedElements: WatchList<T> = findElements({
        inArray: previous,
        butNotIn: current,
      }).map(({ value, index }) => ({ value, index, change: 'removed' }));

      const commonElements = current
        .map((value, index) => ({ value, index }))
        .filter(({ value }) => previous.includes(value));

      const movedElements: WatchList<T> = commonElements
        .filter(({ value, index }) => previous.indexOf(value) !== index)
        .map(({ value, index }) => ({ value, index, change: 'changedIndex' }));

      return [...newElements, ...movedElements, ...removedElements];
    })
  );
}
