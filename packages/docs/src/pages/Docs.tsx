import { component, For } from 'tinaf/component';
import { RouterLink, RouterView } from 'tinaf/router';

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
        label: 'Creating an application',
        link: '/docs/create-application',
      },
      {
        label: ' Reactivity',
        link: '/docs/reactivity',
      },
    ],
  },
] as const;

const Sidebar = component(() => {
  return (
    <div className="w-94 p-16 h-full border-r border-gray-400 overflow-auto flex flex-col gap-8">
      <For each={groups} keyFunction={(g) => g.section}>
        {(g: (typeof groups)[number]) => (
          <Group section={g.section} items={g.items} />
        )}
      </For>
    </div>
  );
});
export const Docs = component(() => {
  return (
    <div className="flex flex-row justify-start w-full text-xl">
      <Sidebar />
      <div className="px-5 w-full">
        <RouterView />
      </div>
    </div>
  );
});
