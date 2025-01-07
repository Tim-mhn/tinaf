import { component, For } from "tinaf/component";



const Section = component(({ children}) => {
    return <div className="text-white text-lg">{children}</div>
})

const Item = component(({ children}) => {
    return <div className="text-gray-400 hover:text-tm-600 cursor-pointer">{children}</div>
})


const Group = component<{ section: string, items: string[]}>(({ section, items}) => {
    return <div className="flex flex-col gap-2">
        <Section>{ section }</Section>

        <For each={items} keyFunction={i => i} >
            { (item: string) => <Item>{ item }</Item>}
        </For>
    </div>
})


const groups : Array<{ section: string, items: string[]}> = [{
    section: "Getting started",
    items: ["Quick start"]
}, {
    section: "Essentials",
    items: ["Creating an application", "Reactivity"]
}] as const


const Sidebar = component(() => {
   return <div className="w-94 p-16 h-full border-r border-gray-400 overflow-auto flex flex-col gap-8">
    <For each={ groups} keyFunction={g => g.section}>
        { (g: typeof groups [number]) => <Group section={g.section} items={g.items} /> }
    </For>
</div>
})
export const Docs = component(() => {
    return <div className="flex flex-row justify-start w-full text-xl">
       <Sidebar />
    </div>
})