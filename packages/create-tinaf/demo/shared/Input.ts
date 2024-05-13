import { input } from 'tinaf/dom';
import type { InputReactive } from 'tinaf/reactive';

export const Input = (
  reactiveText: InputReactive<string>,
  { placeholder } = { placeholder: 'Type something' }
) =>
  input(reactiveText, { placeholder }).addClass(
    'border rounded-sm p-2 border-slate-800'
  );
