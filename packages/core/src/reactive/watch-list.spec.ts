import { describe, it, expect } from 'vitest';
import { watchList, type WatchList } from './watch-list';
import { reactive } from './reactive';
import { take } from 'rxjs';
describe('watch list', () => {
  it('emits the new items when we append an item to a list', () => {
    const list = ['a', 'b', 'c'];

    const rxList = reactive([...list]);

    const emissions: WatchList<string>[] = [];

    watchList(rxList)
      .pipe(take(2))
      .subscribe((newValues) => emissions.push(newValues));

    list.push('d');
    rxList.update([...list]);

    list.push('e', 'f');
    rxList.update([...list]);

    expect(emissions).toEqual<WatchList<string>[]>([
      [
        {
          index: 3,
          value: 'd',
          change: 'added',
        },
      ],
      [
        {
          index: 4,
          value: 'e',
          change: 'added',
        },
        {
          index: 5,
          value: 'f',
          change: 'added',
        },
      ],
    ]);
  });

  it('emits the items that have changed ', () => {
    const list = reactive(['a', 'b', 'c']);

    const emissions: WatchList<string>[] = [];

    watchList(list)
      .pipe(take(3))
      .subscribe((emission) => emissions.push(emission));

    list.update(['a', 'd', 'c']);
    list.update(['a', 'e', 'f']);
    list.update(['b', 'e', 'f', 'g']);

    expect(emissions).toEqual<WatchList<string>[]>([
      [
        {
          value: 'd',
          index: 1,
          change: 'added',
        },
        {
          value: 'b',
          index: 1,
          change: 'removed',
        },
      ],
      [
        {
          value: 'e',
          index: 1,
          change: 'added',
        },
        {
          value: 'f',
          index: 2,
          change: 'added',
        },
        {
          value: 'd',
          index: 1,
          change: 'removed',
        },
        {
          value: 'c',
          index: 2,
          change: 'removed',
        },
      ],
      [
        {
          value: 'b',
          index: 0,
          change: 'added',
        },
        {
          value: 'g',
          index: 3,
          change: 'added',
        },
        {
          value: 'a',
          index: 0,
          change: 'removed',
        },
      ],
    ]);
  });

  it('emits values removed ', () => {
    const list = reactive(['a', 'b', 'c', 'd']);

    const emissions: WatchList<string>[] = [];

    watchList(list)
      .pipe(take(1))
      .subscribe((emission) => emissions.push(emission));

    list.update(['a', 'd']);

    expect(emissions).toEqual<WatchList<string>[]>([
      [
        {
          value: 'd',
          index: 1,
          change: 'changedIndex',
        },

        {
          value: 'b',
          index: 1,
          change: 'removed',
        },
        {
          value: 'c',
          index: 2,
          change: 'removed',
        },
      ],
    ]);
  });
});
