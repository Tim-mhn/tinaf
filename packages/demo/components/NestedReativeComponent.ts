import { bool, not, reactive } from '../../../packages/core/src/reactive';
import { component } from '../../../packages/core/src/component/component';
import { button, div } from '../../../packages/core/src/dom/dom';

const ChildWithState = component(() => {
  const count = reactive(0);

  const increment = () => count.update(count.value + 1);

  return div(div(count), button('+').on({ click: increment }));
});

export const ParentWithReactiveChild = component(() => {
  const [isDarkMode, toggleDarkMode] = bool(false);

  return div(
    div(
      'Here is a bug. Increase the counter and toggle the dark mode. The counter will be reset. This is because the parent is a div with reactive content. When the reactive value updates we rerender the parent, without "saving" the child"s state'
    ).addClass('font-semibold text-red-800'),
    isDarkMode, // NB: if we wrap "isDarkMode" with a div, there is no bug
    ChildWithState,
    button('Toggle dark mode').on({ click: toggleDarkMode })
  ).addClass({
    'p-2 rounded-md border': true,
    'bg-slate-800 text-slate-100': isDarkMode,
    'bg-white  border-slate-800 text-slate-800': not(isDarkMode),
  });
});
