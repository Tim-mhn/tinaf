import {
  component,
  componentWithProps,
} from '../../core/src/component/component';
import { button } from '../../core/src/dom/dom';
import { computed, maybeComputed, toValue } from '../../core/src/reactive';

export const Button = componentWithProps<
  { disabled: boolean },
  { onClick: () => void },
  ['child']
>(({ disabled, onClick, child }) => {
  const disabledClass = maybeComputed(
    () =>
      toValue(disabled)
        ? 'bg-slate-400 cursor-none'
        : 'bg-slate-100 cursor-pointer hover:bg-slate-200',
    [disabled]
  );

  return button(child)
    .addClass([
      'border border-slate-800 bg-slate-100 text-slate-800 p-1 rounded-md',
      disabledClass,
    ])
    .on({
      click: onClick,
    });
});
