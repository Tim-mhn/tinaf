import { component } from 'tinaf/component';
import { computed, toValue } from 'tinaf/reactive';
export const Divider = component(() => {
  return <div className="w-full h-[1px] bg-gray-700"></div>;
});

export const Link = component<{ href: string; color?: 'green' | 'white' }>(
  ({ href, color = 'white', children }) => {
    const cls = computed(() =>
      toValue(color) === 'green' ? 'text-tm-500 border-tm-500' : ''
    );
    return (
      <a
        className={['hover:underline underline-offset-4 cursor-pointer ', cls]}
        href={href as string}
      >
        {children}
      </a>
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
