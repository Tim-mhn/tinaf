import { component, componentWithProps } from '../framework/v3/component';
import { div } from '../framework/v3/dom/dom-element';
import { Component, DomElement } from '../framework/v3/types';

/**
 *
 *
 * () => Card({ title: Title, subtitle: Subtitle })
 *
 */

export const Card = componentWithProps<{
  title: Component | DomElement;
  subtitle: Component | DomElement;
  child: Component | DomElement;
}>(({ title, subtitle, child }) => {
  return () =>
    div(
      [div([title, subtitle], { class: 'flex flex-col gap-1' }), div(child)],
      {
        class:
          'flex flex-col border border-slate-300 p-2 gap-4 w-80 rounded-md',
      }
    );
});
