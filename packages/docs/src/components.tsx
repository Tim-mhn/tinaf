import {
  component,
  getVComponentChildren,
  Show,
  Switch,
} from 'tinaf/component';
import {
  computed,
  isReactive,
  isSourceReactive,
  MaybeReactive,
  Reactive,
  toValue,
  xequal,
  xif,
} from 'tinaf/reactive';
import { RouterLink } from 'tinaf/router';
import { isVComponent } from '../../core/src/component/is-component';
export const Divider = component(() => {
  return <div className="w-full h-[1px] bg-gray-700"></div>;
});

type RadioGroupContext = {
  model: MaybeReactive<string>;
};
export const RadioGroup = component<{
  model: string;
  onModelUpdate?: (m: string) => void;
}>(({ children = [], model }) => {
  console.log(children);

  getVComponentChildren(children).forEach((c) => {
    c.provide<RadioGroupContext>?.({
      model: model,
    });
  });

  return (
    <div className="flex  bg-slate-800   w-fit rounded-sm">{...children}</div>
  );
});

export const Radio = component<
  { value: string; activeClass?: string },
  RadioGroupContext
>(({ value, activeClass, children = [] }, context) => {
  const updateValue = () => {
    console.log('update value called');
    if (!isSourceReactive(context.model)) {
      console.warn(
        `A non source reactive value has been passed to <Radio /> with value ${value}`
      );
      return;
    }

    context.model.update(value);
  };

  const cls = xif(xequal(context.model, value)).xthen(activeClass).xelse('');

  return (
    <div
      onClick={updateValue}
      className={['hover:bg-slate-600 p-2 cursor-pointer', cls]}
    >
      {...children}
    </div>
  );
});
/**
 *
 *
 * const Switch = component(() => {
 *
 *  const packageManager = ref("npm");
 *
 *
 *  return <div>
 *    <RadioGroup ref="packageManager">
 *    { (value, isActive) => {
 * return <Radio value="npm" activeClass="bg-x"> npm </Radio>
 *    <Radio value="yarn"> yarn </Radio>
 * }}
 *  </RadioGroup>
 *
 *  <CopyText > { packageManager === "npm" ? "npx create tinaf" : "yarn create-tinaf"} </CopyText>
 * </div>
 *
 *
 * const Radio = component<{ value: string, injections: RadioGroupInjections }>(() => {
 *   const { model } = injections;
 *
 *
 *
 *
 *
 *
 * })
 * })
 */

export const Link = component<{ href: string; color?: 'green' | 'white' }>(
  ({ href, color = 'white', children }) => {
    const cls = computed(() =>
      [
        toValue(color) === 'green' ? 'text-tm-500 border-tm-500' : '',
        'hover:underline underline-offset-4 cursor-pointer',
      ].join(' ')
    );

    const isExternalLink = computed(() => toValue(href).startsWith('http'));
    return (
      <Show
        when={isExternalLink}
        fallback={
          <RouterLink className={cls} to={href}>
            {' '}
            {children}
          </RouterLink>
        }
      >
        <a className={cls} href={href as string}>
          {children}
        </a>
      </Show>
    );
  }
);

export const Button = component<{ onClick: () => void }>(
  ({ onClick, children }) => {
    return (
      <button
        onClick={onClick}
        className="w-fit bg-tm-500 hover:bg-tm-400 cursor-pointer text-3xl text-tm-950 rounded-md px-16 py-4"
      >
        {children}
      </button>
    );
  }
);
