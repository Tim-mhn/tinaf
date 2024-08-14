import { describe, expect, it, vi } from 'vitest';
import { reactive } from './reactive';
import { effect } from './effect';

describe('effect', () => {
  it('executes the callback function when the value changes', () => {
    const source = reactive('foo');

    const callback = vi.fn();

    effect(() => {
      callback();
    }, [source]);

    expect(callback).not.toHaveBeenCalled();

    source.update('bar');

    expect(callback).toHaveBeenCalled();
  });

  it('stops watching the sources once we call the unsubscribe method', () => {
    const source = reactive('foo');

    const callback = vi.fn();

    const unsubscribe = effect(() => {
      callback();
    }, [source]);

    unsubscribe();

    source.update('bar');

    expect(callback).not.toHaveBeenCalled();
  });
});
