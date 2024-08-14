import { component } from 'tinaf/component';
import { type InputReactive } from 'tinaf/reactive';



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
