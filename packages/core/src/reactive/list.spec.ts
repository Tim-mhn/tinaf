import { describe, it, expect } from 'vitest';
import { reactiveList } from './list';
describe('reactive list', () => {
  it('should be able to add an element to the list', () => {
    const list = reactiveList<string>();

    list.add('hello');
    list.add('world');
    expect(list.value).toEqual(['hello', 'world']);
  });
});
