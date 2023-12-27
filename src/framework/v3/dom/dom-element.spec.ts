import { describe, expect, it } from 'vitest';
import { formatClassesToArray } from './dom-element';

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
});
