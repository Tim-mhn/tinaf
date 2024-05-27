import type { WithHtml } from '../component/component';
import { vi } from 'vitest';
import { fromPartial } from './from-partial';

export const buildMockHtmlElement: () => HTMLElement = () =>
  fromPartial<HTMLElement>({
    removeChild: vi.fn<[any], any>(),
    insertBefore: vi.fn<[any], any>(),
    childNodes: [] as any as NodeListOf<any>,
    append: vi.fn(),
  });

export const buildMockParent: () => WithHtml = () => ({
  html: buildMockHtmlElement(),
});
