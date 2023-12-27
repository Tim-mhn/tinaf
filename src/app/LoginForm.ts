import { component } from '../framework/v3/component';
import { button, div, h2 } from '../framework/v3/dom/dom-element';
import { form } from '../framework/v3/dom/form';
import { input } from '../framework/v3/dom/input';
import { bool, reactive } from '../framework/v3/reactive';
import { Button } from './ui/Button';

const FormTitle = h2('Testing a form', { class: 'text-lg font-medium' });
export const LoginForm = component(() => {
  const name = reactive('test');

  const [disabled, toggleDisabled] = bool(false);

  return () =>
    div(
      [
        FormTitle,
        form(
          [
            input(
              { value: name, placeholder: 'Enter your username', disabled },
              {
                class:
                  'border border-slate-300 rounded-sm p-2 focus:border-slate-600 hover:border-slate-500',
              }
            ),
            Button({
              children: 'Submit',
              options: {
                type: 'submit',
              },
            }),
            Button({
              children: 'Toggle disabled',
              options: {
                click: toggleDisabled,
                type: 'button',
              },
            }),
          ],
          {
            class: 'flex gap-2',
            submit: (e) => {
              e?.preventDefault();
              console.log({ name: name.value });
            },
          }
        ),
      ],
      {
        class: 'flex flex-col flex-grow',
      }
    );
});

/**
 *
 * const MyForm = cmp(() => {
 *
 *    const name = reactive('')
 *    const disabled = reactive(false)
 *
 *    return () => input(
 *       value: name,
 *       disabled: disabled
 *
 *     )
 *
 * })
 *
 */
