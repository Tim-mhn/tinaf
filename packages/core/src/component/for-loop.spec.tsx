/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';
import { component } from './v-component';
import { reactiveList } from '../reactive';
import { For } from './for-loop';
import { buildMockParent } from '../test-utils/dom-element.mock';
import { render } from '../render';

function setup({ list }: { list: ReturnType<typeof reactiveList<string>> }) {
  const renderFn = vi.fn((item: string) => item);

  const TestComponent = component(() => {
    return <For each={list}>{renderFn}</For>;
  });

  const mockParent = buildMockParent();

  let cmp!: ReturnType<typeof TestComponent>;

  const mount = () => {
    cmp = TestComponent({});

    render(cmp, mockParent.html);
  };

  const hasChildren = (children: any[]) => {
    expect(cmp.parent.html.childNodes).toEqual(children);
  };

  const shouldHaveRenderedNChildren = (n: number) => {
    expect(renderFn).toHaveBeenCalledTimes(n);
  };

  return { shouldHaveRenderedNChildren, mount, hasChildren };
}
describe('<For />', () => {
  it('correctly renders the list of children initially and renders a new child when a new item is added', () => {
    const items = reactiveList(['a', 'b', 'c']);

    const { mount, shouldHaveRenderedNChildren } = setup({ list: items });

    mount();

    shouldHaveRenderedNChildren(3);

    items.add('d');

    shouldHaveRenderedNChildren(4);
  });

  it('deletes old children when an item is deleted from the list', () => {
    const items = reactiveList(['a', 'b', 'c']);

    const { mount, hasChildren } = setup({ list: items });

    mount();

    hasChildren(['a', 'b', 'c']);

    items.update(['a', 'b']);

    hasChildren(['a', 'b']);

  });
});
