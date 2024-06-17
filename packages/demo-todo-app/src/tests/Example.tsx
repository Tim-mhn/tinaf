import { component } from "tinaf/component";
import { div } from "tinaf/dom";

import { reactive } from 'tinaf/reactive'
const Foo = component(() => {
    return div('Foo')
})



const Bar = component<{ title: string}> (({ title, children}) => {



    console.log({ children})


    return div(
        div(title),
        ...(children || [])
    )
})



export const Example = component(() => {

    const title = reactive("test title")

    // TODO: need to type the custom JSX 
    return <Bar title={title} className="border border-blue-500  bg-blue-100 p-4" >
        <Foo />
        <Foo />
    </Bar>
})