import { Observable, map, pairwise, startWith, tap } from 'rxjs';
import { toValue } from './toValue';
import { type ReactiveValue } from './reactive';

type WatchListItem<T> = {
  index: number;
  value: T;
  change: 'added' | 'removed';
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

      const additionalCommonElements: WatchList<T> =
        getAdditionalCommonElements({
          previousArray: previous,
          nextArray: current,
        }).map(({ value, index }) => ({ value, index, change: 'added' }));

      const removedElements: WatchList<T> = findElements({
        inArray: previous,
        butNotIn: current,
      }).map(({ value, index }) => ({ value, index, change: 'removed' }));

      return [...newElements, ...additionalCommonElements, ...removedElements];
    })
  );
}

export function getAdditionalCommonElements<T>({
  previousArray,
  nextArray,
}: {
  previousArray: T[];
  nextArray: T[];
}): { value: T; index: number }[] {
  const uniqueCommonElements = new Set(
    nextArray.filter((element) => previousArray.includes(element))
  );

  const additionalCommonElements: { value: T; index: number }[] = [];

  for (const element of uniqueCommonElements) {
    const countInPreviousArray = previousArray.filter(
      (e) => e === element
    ).length;

    const additionalInstancesOfThisCommonElement = nextArray
      .map((value, index) => ({ value, index }))
      .filter(({ value }) => value === element)
      .slice(countInPreviousArray);

    additionalCommonElements.push(...additionalInstancesOfThisCommonElement);
  }

  return additionalCommonElements;
}
