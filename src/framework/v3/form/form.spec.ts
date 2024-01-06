import { describe, it, expect } from 'vitest';
import { reactiveForm } from '.';
import { reactive } from '../reactive';
describe('reactive form', () => {
  it('form updates its validity state when reactive control update their values', () => {
    const name = reactive('');
    const email = reactive('');
    const form = reactiveForm({
      name: [name, (v: string) => v.length > 3],
      email: [email, (v: string) => v.includes('@')],
    });

    expect(form.valid.value).toBeFalsy();

    name.update('a long name');

    expect(form.valid.value).toBeFalsy();

    email.update('anEmailWith@gmail.com');

    expect(form.valid.value).toBeTruthy();
    expect(form.invalid.value).toBeFalsy();
  });
});
