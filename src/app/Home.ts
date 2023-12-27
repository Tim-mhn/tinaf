import { component } from '../framework/v3/component';
import { div, h1, h2 } from '../framework/v3/dom/dom-element';
import { Card } from './Card';

const Title = () => h1('This is a title', { class: 'text-lg font-bold' });
const Subtitle = () =>
  h2('This is a subtitle', { class: 'text-md font-medium' });

const Child = () =>
  div(
    'This is some description. This is some description. This is some description'
  );

export const Home = component(() => {
  const card = () =>
    Card({
      title: Title(),
      subtitle: Subtitle(),
      child: Child(),
    });

  const cards = [card(), card(), card(), card()];

  return () =>
    div(cards, {
      class: 'flex flex-col lg:grid lg:grid-cols-3  gap-4',
    });
});
