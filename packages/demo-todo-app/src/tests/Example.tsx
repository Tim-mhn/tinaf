import { component, componentV2 } from "tinaf/component";
import { div } from "tinaf/dom";

import { reactive } from 'tinaf/reactive'
const Foo = componentV2< { text: string }>(({ text, children }) => {
    return div(text, ...(children || []))
})



const Bar = componentV2<{ title: string}> (({ title, children}) => {



    console.log({ children})


    return div(
        div(title),
        ...(children || [])
    )
})



export const Example = componentV2(() => {

    const title = reactive("test title")

    // TODO: need to type the custom JSX 
    return <Bar title={title} className="border border-blue-500  bg-blue-100 p-4" >
        <Foo text="yo"/>
        <Foo text="hi" className="border border-blue-600 rounded-sm p-1">
            <Foo text="inner"/>
        </Foo>
    </Bar>
})


