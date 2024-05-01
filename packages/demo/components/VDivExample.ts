import { vcomponent } from '@tinaf/core/src/component/v-component.v2';
import { button, div } from '@tinaf/core/src/dom/dom';
import { bool, reactive } from '@tinaf/core/src/reactive';

const Child = vcomponent(() => {
  const [myBool, toggle] = bool(false);

  console.log('Child');

  return div(myBool, button('toggle bool').on({ click: toggle }));
});

export const VDivExample = vcomponent(() => {
  const count = reactive(0);
  const increment = () => {
    count.update(count.value + 1);
    console.log({ count: count.value });
  };
  const myButton = button('Increment').on({ click: increment });
  const myDiv = div(count, myButton, Child);

  //   console.log({ divSources: myDiv.sources });
  //   return myDiv;
  return myDiv;
});
