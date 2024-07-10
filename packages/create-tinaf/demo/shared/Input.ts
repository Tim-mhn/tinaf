import { component } from 'tinaf/component';
import { type InputReactive } from 'tinaf/reactive';

// export const Input = component<{reactiveText: InputReactive(
//   reactiveText: InputReactive<string>,
//   { placeholder } = { placeholder: 'Type something' }
// >({ reactiveText, placeholder}) => {

//   // return <input(reactiveText, { placeholder }).addClass(
//   //   'border rounded-sm p-2 border-slate-800'
//   // );

export const Input = component<{
  reactiveText: InputReactive<string>;
  placeholder?: string;
}>(({ reactiveText, placeholder = 'Type something' }) => {
  return (
    <input
      value={reactiveText}
      placeholder={placeholder}
      className="border rounded-sm p-2 border-slate-800"
    />
  );
});
