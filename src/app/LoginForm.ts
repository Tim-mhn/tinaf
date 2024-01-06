import { component } from '../framework/v3/component';
import { button, div, h2, span } from '../framework/v3/dom/dom-element';
import { form } from '../framework/v3/dom/form';
import { input } from '../framework/v3/dom/input';
import { reactiveForm } from '../framework/v3/form';
import { bool, reactive } from '../framework/v3/reactive';
import { Button } from './ui/Button';

const FormTitle = h2('Testing a form', { class: 'text-lg font-medium' });

/***
 *
 * const MyForm = cmp(() => {
 *
 *
 * const nameValidator = (name: string) => name && name?.length > 15
 *
 * const name = reactive('');
 *
 * const email = reactive('');
 *
 * const emailValidator = (email: string) => email && email.match(EMAIL_REGEX)
 *
 *
 * const form = reactiveForm({
 *   email: [email, emailValidator],
 *   name: [name, nameValidator]
 * })
 *
 *
 *
 * return () => form([
 *   input(form.name, { class: '' }),
 *   input(form.email, { class : '' })
 * ], { form })
 *
 *
 * })
 *
 *
 */
export const LoginForm = component(() => {
  const name = reactive('test');

  const email = reactive('');

  const loginForm = reactiveForm({
    name: [name, (n: string) => !!n],
    email: [email, (email: string) => email.includes('@')],
  });

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
            input(
              {
                value: email,
                placeholder: 'Enter your email',
                disabled,
                type: 'email',
              },
              {
                class:
                  'border border-slate-300 rounded-sm p-2 focus:border-slate-600 hover:border-slate-500',
              }
            ),
            button('can be disabled', {
              disabled: loginForm.invalid,
              styles: {
                disabled: {
                  background: 'red',
                  border: '1px solid ',
                },
              },
            }),
            Button({
              children: 'Submit',
              options: {
                type: 'submit',
                disabled: loginForm.invalid,
              },
            }),
            Button({
              children: 'Toggle disable',
              options: {
                click: toggleDisabled,
                type: 'button',
              },
            }),
            span(`form is valid = ${loginForm.valid.value}`),
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
