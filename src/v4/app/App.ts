import { div } from '../framework/dom/div';
import { Component } from '../framework/types';
import { bool, computed, reactive } from '../framework/reactive/reactive';
import { MaybeReactive } from '../framework/reactive/types';
import { ifTrue } from '../framework/render';
import { component } from '../framework/component';

const Header = component(() => {
  return () => div('header');
});

const Card = ({
  title,
  subtitle,
}: {
  title: MaybeReactive<string>;
  subtitle: MaybeReactive<string>;
}) => {
  return div([div(title), div(subtitle)]);
};

const ToggleVisible = component(() => {
  const [visible, toggleVisible] = bool(true);

  setInterval(() => toggleVisible(), 1000);

  return () => (ifTrue(visible) ? div('visible') : div('invisible'));
});

export const App = component(() => {
  const title = reactive('title');

  const subtitle = computed(() => `SUB ${title.value}`, [title]);

  setTimeout(() => {
    console.log('updating title');
    title.update('title @' + Date.now());
  }, 2000);

  return () =>
    div([
      Header(),
      // Card({ title, subtitle }),
      ToggleVisible(),
      div('footer'),
    ]);
});
