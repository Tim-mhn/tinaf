import { component, type VComponent } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { bool, reactive } from 'tinaf/reactive';

const Child = component(() => {
  const [myBool, toggle] = bool(false);

  console.log('Child');

  return div(myBool, button('toggle bool').on({ click: toggle }));
});

export const VDivExample: () => VComponent = component(() => {
  const count = reactive(0);
  const increment = () => {
    count.update(count.value + 1);
    console.log({ count: count.value });
  };
  const myButton = button('Increment').on({ click: increment });
  const myDiv = div(count, myButton, Child());

  //   console.log({ divSources: myDiv.sources });
  //   return myDiv;
  return myDiv;
});
