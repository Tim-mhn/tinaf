import { describe, expect, it } from 'vitest';
import { reactive } from './reactive';
import { getReactiveElementsFromObject } from './utils';
import { objectKeys } from '../utils/object';

describe('getReactiveElementsFromObject', () => {
  it('returns a subset of the object keeping only the reactive values', () => {
    const obj = {
      foo: 1,
      bar: reactive(2),
      baz: reactive('baz'),
      mop: 4,
    };

    const reactiveElements = getReactiveElementsFromObject(obj);

    expect(objectKeys(reactiveElements)).toEqual(['bar', 'baz']);

    // error is never raised. This is to ensure type-safety
    if (!reactiveElements.bar || !reactiveElements.baz) {
      throw new Error('bar and baz should be defined');
    }
    expect(reactiveElements.bar.value).toBe(2);
    expect(reactiveElements.baz.value).toBe('baz');
  });
});
