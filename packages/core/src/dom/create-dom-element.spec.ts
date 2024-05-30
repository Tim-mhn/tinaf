import { describe, expect, it } from 'vitest';
import { img } from './img';
import { reactive } from '../reactive';
import { buildMockParent } from '../test-utils/dom-element.mock';
import { createMockDocument, setupFakeApp_v2 } from '../test-utils/fake-app';
describe('dom element', () => {
  it('should create the correct dom element', () => {
    const mockDocument = createMockDocument();
    const i = img(
      {
        src: 'https://example.com/image.jpg',
      },
      {
        doc: mockDocument,
      }
    );

    setupFakeApp_v2(() => i, {
      document: mockDocument,
    });

    expect(mockDocument.createElement).toHaveBeenCalled();

    //   fakeWindow.

    // const parent = buildMockParent()

    // i.init(parent)
  });

  describe('options', () => {
    it('should update the image src if we pass it as a reactive value', () => {
      const src = reactive('https://example.com/image.jpg');

      const mockDocument = createMockDocument();
      const imgComponent = img(
        {
          src,
        },
        {
          doc: mockDocument,
        }
      );

      imgComponent.init(buildMockParent());
      const htmlElement = imgComponent.renderOnce();

      expect(htmlElement.src).toBe('https://example.com/image.jpg');

      src.update('https://example.com/image2.jpg');

      expect(htmlElement.src).toBe('https://example.com/image2.jpg');
    });

    it('should accept options with raw values', () => {
      const src = reactive('https://example.com/image.jpg');

      const mockDocument = createMockDocument();
      const imgComponent = img(
        {
          src: 'https://example.com/image.jpg',
        },
        {
          doc: mockDocument,
        }
      );

      imgComponent.init(buildMockParent());
      const htmlElement = imgComponent.renderOnce();

      expect(htmlElement.src).toBe('https://example.com/image.jpg');
    });
  });
});
