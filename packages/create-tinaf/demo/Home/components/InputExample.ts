import { component } from 'tinaf/component';
import { div, input, span } from 'tinaf/dom';
import { inputReactive } from 'tinaf/reactive';
import { Input } from '../../shared/Input';

export const InputExample = component(() => {
  const text = inputReactive('');

  return div(
    Input(text, { placeholder: 'Type something' }),
    span(text)
  ).addClass('flex items-center gap-4');
});
