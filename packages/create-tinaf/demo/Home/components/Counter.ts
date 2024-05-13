import { component } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { computed, reactive } from 'tinaf/reactive';

export const Counter = component(() => {
  const count = reactive(0);

  const increment = () => count.update(count.value + 1);

  const countSentence = computed(() => `Count is ${count.value}`, [count]);

  return div(
    button('Increment')
      .on({ click: increment })
      .addClass('border p-2 border-slate-800 rounded-sm hover:bg-slate-100'),
    div(countSentence)
  ).addClass('flex items-center gap-4');
});
