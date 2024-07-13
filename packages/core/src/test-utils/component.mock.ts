import { vi } from 'vitest';
import type { VComponent } from '../component';
import { buildMockParent } from './dom-element.mock';

export const buildMockComponent = (
  name: string
): (() => VComponent & { name: string }) => {
  return () => ({
    __type: 'V_COMPONENT',
    addClass: vi.fn(),
    html: [],
    init: vi.fn(),
    renderOnce: vi.fn(),
    destroy: vi.fn(),
    name,
    parent: buildMockParent(),
  });
};
