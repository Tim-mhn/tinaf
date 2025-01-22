import { component, For } from 'tinaf/component';
import { RouterLink, RouterView } from 'tinaf/router';
import { Divider, DropdownMenu } from '../components';

const Section = component(({ children }) => {
  return <div className="text-white text-lg">{children}</div>;
});

const Item = component<{ to: string }>(({ to, children }) => {
  return (
    <RouterLink
      activeClass="text-tm-500 underline underline-offset-4"
      to={to}
      className="text-gray-400 hover:text-tm-600 cursor-pointer"
    >
      {children}
    </RouterLink>
  );
});

type Link = {
  label: string;
  link: string;
};
const Group = component<{ section: string; items: Link[] }>(
  ({ section, items }) => {
    return (
      <div className="flex flex-col gap-2">
        <Section>{section}</Section>

        <For each={items} keyFunction={(i) => i.link}>
          {(item: Link) => <Item to={item.link}>{item.label}</Item>}
        </For>
      </div>
    );
  }
);

const groups: Array<{ section: string; items: Array<Link> }> = [
  {
    section: 'Getting started',
    items: [
      {
        label: 'Introduction',
        link: '/docs/introduction',
      },
      {
        label: 'Quick start',
        link: '/docs/quick-start',
      },
    ],
  },
  {
    section: 'Essentials',
    items: [
      {
        label: 'Components',
        link: '/docs/components',
      },
      {
        label: ' Reactivity',
        link: '/docs/reactivity',
      },
      {
        label: 'For loops',
        link: '/docs/for-loops',
      },

      {
        label: 'Conditional Rendering',
        link: '/docs/conditional-rendering',
      },

      {
        label: 'Styling',
        link: '/docs/styling',
      },

      {
        label: 'Routing',
        link: '/docs/routing',
      },
    ],
  },
] as const;

const Sidebar = component(() => {
  return (
    <div className="hidden md:flex w-96 py-16 px-8 h-full border-r border-gray-400 overflow-auto flex-col gap-8">
      <For each={groups} keyFunction={(g) => g.section}>
        {(g: (typeof groups)[number]) => (
          <Group section={g.section} items={g.items} />
        )}
      </For>
    </div>
  );
});

const MobileMenu = component(() => {
  return (
    <div className=" bg-neutral-900 ">
      <DropdownMenu
        className="py-2 text-gray-400"
        trigger={({ toggleMenu }) => (
          <button
            className="hover:text-gray-300"
            onClick={(e?: Event) => toggleMenu(e)}
          >
            Menu
          </button>
        )}
      >
        <div className="flex flex-col gap-2 p-2 w-60">
          <For each={groups} keyFunction={(g) => g.section}>
            {(g: (typeof groups)[number]) => (
              <Group section={g.section} items={g.items} />
            )}
          </For>
        </div>
      </DropdownMenu>
      <Divider />
    </div>
  );
});

export const Docs = component(() => {
  return (
    <div className="flex  flex-col md:flex-row justify-start w-full text-xl">
      <Sidebar />
      <MobileMenu className="visible md:invisible sticky top-0  mb-4 " />

      <div className="px-5 w-full">
        <RouterView />
      </div>
    </div>
  );
});
