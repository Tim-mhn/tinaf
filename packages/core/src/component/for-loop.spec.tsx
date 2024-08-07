/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';
import { component } from './v-component';
import { reactiveList } from '../reactive';
import { For } from './for-loop';
import { fakeMount } from '../test-utils/fake-mount';

function setup({ list }: { list: ReturnType<typeof reactiveList<string>> }) {
  const renderFn = vi.fn((item: string) => item);

  const TestComponent = component(() => {
    return <For each={list}>{renderFn}</For>;
  });



  let cmpChildren: ReturnType<typeof fakeMount>['children'];
  const mount = () => {

    const { children } = fakeMount(TestComponent)

    cmpChildren = children;

  };

  const hasChildren = (children: any[]) => {
    expect(cmpChildren).toEqual(children);
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
