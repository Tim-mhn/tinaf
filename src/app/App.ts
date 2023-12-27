import { bool, computed, reactive } from '../framework/v3/reactive';
import {
  ComponentFnInput,
  component,
  componentWithProps,
} from '../framework/v3/component';
import { button, div, h1, p, span } from '../framework/v3/dom/dom-element';
import { Component } from '../framework/v3/types';
import { Header } from './Header';
import { Home } from './Home';
import { LoginForm } from './LoginForm';

const ToggleMessage = component(() => {
  const [show, toggle] = bool(false);

  const title = reactive('This is a title');

  const message = computed(() => (show.value ? 'Hide' : 'Show'));

  const className = computed(() =>
    show.value ? 'text-primary' : 'text-secondary'
  );

  return () =>
    div([
      span(title.value),
      show.value && div('hello'),
      button(message.value, { click: toggle, class: className.value }),
    ]);
});

const Title: ({ text }: { text: string }) => Component =
  ({ text }) =>
  () => {
    return {
      renderFn: () => h1(text, { class: 'text-7xl' }),
    };
  };

const TitleBis = componentWithProps<{ text: string }>(({ text }) => {
  return () => h1(text, { class: 'text-7xl' });
});

const ColorAndCount = componentWithProps<{ count: number }>(({ count }) => {
  const color = reactive('blue');

  const changeColor = () =>
    color.update(color.value === 'blue' ? 'green' : 'blue');

  return () =>
    div([
      span(count),
      span(color.value),
      button('change color', { click: changeColor }),
    ]);
});

const Counter = componentWithProps<{ count: number }>(({ count }) => {
  return () => div(count);
});

const CounterWrapper = component(() => {
  const count = reactive(1);

  const increment = () => {
    count.update(count.value + 1);
  };

  return () =>
    div([
      Counter({ count: count.value }),
      Counter({ count: count.value }),
      button('click to increment', {
        click: increment,
        class:
          'border border-slate-600 p-1 bg-slate-100 hover:bg-slate-200 rounded-sm',
      }),
      ToggleMessage,
      ColorAndCount({ count: count.value }),
    ]);
});

const Container = component(({ children }: { children: Component[] }) => {
  return () => div(children, { class: 'flex flex-col p-8 gap-8' });
});
export const App = component(() => {
  const text = reactive('Hello there');

  return () =>
    div(
      [
        Header,
        Container({
          children: [
            Home,
            LoginForm,
            Title({ text: text.value }),
            TitleBis({ text: text.value }),
            CounterWrapper,
          ],
        }),
      ],
      { class: 'flex flex-col gap-4 ' }
    );
});
