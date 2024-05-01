import { describe, expect, it } from 'vitest';
import { reactive } from './reactive';
import { toValue } from './toValue';

describe('toValue', () => {
  it('transforms a simple reactive into its value', () => {
    const rx = reactive('hello');

    expect(toValue(rx)).toEqual('hello');
  });

  it('transforms an object with multiple reactive props', () => {
    const objectWithReactiveProps = {
      name: reactive('bob'),
      age: reactive(20),
    };

    expect(toValue(objectWithReactiveProps)).toEqual({ name: 'bob', age: 20 });
  });

  it('transforms a complex multi-level object with multiple reactive props to its value', () => {
    const objectWithReactiveProps = {
      name: reactive('bob'),
      age: reactive(20),
      location: {
        address: reactive({
          street: 'Euston road',
          number: 1,
        }),
        coordinates: {
          latitude: 60,
          longitude: reactive(40),
        },
        details: {
          country: reactive('UK'),
          zipCode: 18350,
        },
      },
    };

    expect(toValue(objectWithReactiveProps)).toEqual({
      name: 'bob',
      age: 20,
      location: {
        address: {
          street: 'Euston road',
          number: 1,
        },
        coordinates: {
          latitude: 60,
          longitude: 40,
        },
        details: {
          country: 'UK',
          zipCode: 18350,
        },
      },
    });
  });

  it('keeps an array as it is', () => {
    expect(toValue([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
