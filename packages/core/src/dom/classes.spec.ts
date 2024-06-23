import { describe, expect, it } from 'vitest';
import {
  formatClassesToArray,
  getFormattedClasses,
  mergeClasses,
} from './classes';
import { computed, reactive } from '../reactive';

describe('formatClasses', () => {
  it('returns an array of string if the input is an array', () => {
    expect(formatClassesToArray(['flex', 'flex-col'])).toEqual([
      'flex',
      'flex-col',
    ]);
  });

  it('returns an array of 1 class if the input is a single class string', () => {
    expect(formatClassesToArray('flex')).toEqual(['flex']);
  });

  it('returns an array of classes if the input is a string with multiple classes', () => {
    expect(formatClassesToArray('flex flex-col p-4')).toEqual([
      'flex',
      'flex-col',
      'p-4',
    ]);
  });

  it('ignores multiple spaces', () => {
    expect(formatClassesToArray('flex  flex-col   p-4')).toEqual([
      'flex',
      'flex-col',
      'p-4',
    ]);
  });

  it('correctly separates classes if we pass an array with elements containing multiple classes', () => {
    expect(formatClassesToArray(['flex', 'these-are two-classes'])).toEqual([
      'flex',
      'these-are',
      'two-classes',
    ]);
  });
});

describe('mergeClasses', () => {
  it('correctly merges an array of classes and a single class string', () => {
    const addClassArgs = mergeClasses(['flex', 'flex-col'], 'p-4');

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'flex',
      'flex-col',
      'p-4',
    ]);
  });

  it('correctly merges 2 arrays of classes', () => {
    const addClassArgs = mergeClasses(
      ['flex', 'flex-col'],
      ['p-4', 'bg-white']
    );

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'flex',
      'flex-col',
      'p-4',
      'bg-white',
    ]);
  });

  it('correctly merges 1 arrays of classes and 1 multi classes string', () => {
    const addClassArgs = mergeClasses(['flex', 'flex-col'], 'p-4 bg-white');

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'flex',
      'flex-col',
      'p-4',
      'bg-white',
    ]);
  });

  it('correctly merges 1 arrays of classes and 1 classes record', () => {
    const addClassArgs = mergeClasses(['flex', 'flex-col'], {
      'p-4': true,
      'bg-blue': true,
    });

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'flex',
      'flex-col',
      'p-4',
      'bg-blue',
    ]);
  });

  it('correctly merges 1 arrays of classes and 1 classes record with falsy values', () => {
    const addClassArgs = mergeClasses(['flex', 'flex-col'], {
      'p-4': true,
      'bg-blue': false,
      'm-4': reactive(true),
    });

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'flex',
      'flex-col',
      'p-4',
      'm-4',
    ]);
  });

  it('correctly merges 2 classes record', () => {
    const addClassArgs = mergeClasses(
      {
        'bg-primary': true,
        border: reactive(true),
        'rounded-sm': reactive(false),
      },
      {
        'p-4': true,
        'bg-blue': false,
        'm-4': reactive(true),
      }
    );

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'bg-primary',
      'border',
      'p-4',
      'm-4',
    ]);
  });

  it('correctly merges 1 classes record with one computed string', () => {
    const isDarkTheme = reactive(true);
    const addClassArgs = mergeClasses(
      {
        'bg-primary': true,
        border: reactive(true),
        'rounded-sm': reactive(false),
      },
      computed(
        () => (isDarkTheme.value ? 'bg-dark' : 'bg-light'),
        [isDarkTheme]
      )
    );

    expect(getFormattedClasses(addClassArgs)).toEqual([
      'bg-primary',
      'border',
      'bg-dark',
    ]);
  });
});
