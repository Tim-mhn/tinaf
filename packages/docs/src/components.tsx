import {
  component,
  getVComponentChildren,
  onDestroy,
  onInit,
  Show,
} from 'tinaf/component';
import {
  bool,
  computed,
  isSourceReactive,
  MaybeReactive,
  not,
  toValue,
  xequal,
  xif,
} from 'tinaf/reactive';
import { Component } from 'tinaf/render';
import { injectRouter, RouterLink } from 'tinaf/router';
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

function trueish<T>(v: MaybeReactive<T>) {
  return computed(() => !!toValue(v));
}

export const InlineCode = component(({ children = [] }) => {
  return <Code className="m-1 !inline">{...children}</Code>;
});
export const Code = component<{ copyCode?: string }>(
  ({ copyCode, children = [] }) => {
    return (
      <div className="flex text-sm md:text-lg gap-4 items-center">
        <code className="bg-slate-800 p-2 rounded-sm">{...children}</code>

        <Show when={trueish(copyCode)}>
          <button
            onClick={() =>
              navigator.clipboard.writeText(toValue(copyCode) || '')
            }
          >
            Copy
          </button>
        </Show>
      </div>
    );
  }
);

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
            {children}
          </RouterLink>
        }
      >
        <a className={cls} href={toValue(href)}>
          {children}
        </a>
      </Show>
    );
  }
);

export const HighlightedText = component(({ children = [] }) => {
  return <span className="text-tm-500">{...children}</span>;
});

export const Button = component<{
  onClick?: () => void;
  href?: string;
  size?: 'lg' | 'md';
}>(({ onClick, href, size = 'lg', children = [] }) => {
  const router = injectRouter();

  const onClickFn = () => {
    const link = toValue(href);
    if (link) {
      return router.navigate(link);
    }

    onClick?.();
  };
  return (
    <button
      onClick={onClickFn}
      className={{
        'w-fit bg-tm-500 hover:bg-tm-400 cursor-pointer  text-tm-950 rounded-md px-16 py-4':
          true,
        'text-3xl': toValue(size) === 'lg',
        'text-lg': toValue(size) === 'md',
      }}
    >
      {...children}
    </button>
  );
});

type EventHandler = (e: Event) => void;

export const DropdownMenu = component<{
  className?: string;
  trigger: (params: { toggleMenu: EventHandler }) => Component;
}>(({ trigger, className, children = [] }) => {
  const [menuOpen, toggleMenu] = bool(false);

  const closeMenu = () => {
    menuOpen.update(false);
  };
  onInit(() => {
    window.addEventListener('click', closeMenu);
  });

  onDestroy(() => {
    window.removeEventListener('click', closeMenu);
  });

  return (
    <div className={['relative px-5', className]}>
      {trigger({
        toggleMenu: (e) => {
          console.log('click called');
          e.preventDefault();
          e.stopPropagation();
          toggleMenu();
        },
      })}

      <div
        className={{
          'bg-gray-700 text-gray-200 py-2  absolute top-12 rounded-sm': true,
          hidden: not(menuOpen),
        }}
      >
        {...children}
      </div>
    </div>
  );
});
