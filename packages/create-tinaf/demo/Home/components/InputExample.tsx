import { component } from 'tinaf/component';
import { div, input, span } from 'tinaf/dom';
import { inputReactive } from 'tinaf/reactive';
import { Input } from '../../shared/Input';

export const InputExample = component(() => {
  const text = inputReactive('');

  return div(
    Input( { placeholder: 'Type something', reactiveText: text }),
    span(text)
  ).addClass('flex items-center gap-4');
});
