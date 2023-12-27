import { component } from '../framework/v3/component';
import { div } from '../framework/v3/dom/dom-element';

export const Header = component(() => {
  return () =>
    div(
      [
        div([div('Icon'), div('Example website')], {
          class: 'flex flex-row gap-4',
        }),
        div([div('User icon')], { class: 'flex flex-grow justify-end' }),
      ],
      {
        class: 'flex w-full content-around p-2 border-b border-slate-300',
      }
    );
});
