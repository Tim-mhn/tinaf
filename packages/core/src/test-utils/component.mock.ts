import { vi } from 'vitest';
import type { VComponent } from '../component';

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
  });
};
