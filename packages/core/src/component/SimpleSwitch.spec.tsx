/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from 'vitest';
import { Match, Switch } from './SimpleSwitch';
import { component } from '.';
import { reactive } from '../reactive';
import { fakeMount } from '../test-utils/fake-mount';
import type { ComponentChildren } from '../dom/create-dom-element';

describe('Switch/Match', () => {
  it('initially renders the correct child ', () => {
    const condition = reactive('a');

    const TestComponent = component(() => {
      return (
        <Switch condition={condition}>
          <Match when="a">a</Match>
          <Match when="b">b</Match>
          <Match when="c">c</Match>
        </Switch>
      );
    });

    const { children, cmp } = fakeMount(TestComponent);
    expect(children).toEqual(['a']);
  });

  it('renders the right child  when the condition changes', () => {
    const condition = reactive('a');

    const TestComponent = component(() => {
      return (
        <Switch condition={condition}>
          <Match when="a">a</Match>
          <Match when="b">b</Match>
          <Match when="c">c</Match>
        </Switch>
      );
    });

    const { children } = fakeMount(TestComponent);

    condition.update('b');

    expect(children).toEqual(['b']);
  });

  it('renders the fallback  when no child matches the condition', () => {
    const condition = reactive('no match');

    // TODO: need to find a good way to easily render a string
    //@ts-expect-error
    const Fallback = component((props) => {
      return props.children || [] as ComponentChildren
    })

    const TestComponent = component(() => {




      return (
        <Switch condition={condition} fallback={<Fallback>fallback</Fallback>} >
          <Match when="a">a</Match>
          <Match when="b">b</Match>
          <Match when="c">c</Match>
        </Switch>
      );
    });

    const { children } = fakeMount(TestComponent);


    expect(children).toEqual(['fallback']);
  });
});
