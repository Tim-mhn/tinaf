/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import { extractEventHandlers } from './utils';
describe('extractEventHandlers', () => {
  it('extracts the correct handlers', () => {
    const handlers = extractEventHandlers({
      foo: 'bar',
      onClick: () => 'click',
      onNotAValidHandler: () => 'world',
      onFocus: () => 'focus',
    });

    expect(handlers.click).toBeDefined();
    expect(handlers.click?.()).toEqual('click');
    expect(handlers.focus).toBeDefined;
    expect(handlers.focus?.()).toEqual('focus');
    expect((handlers as any).notAValidHandler).toBeUndefined();
  });
});
