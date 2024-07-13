import { useInterval } from "tinaf/common-hooks";
import { component, Show } from "tinaf/component";
import { bool } from "tinaf/reactive";


const Card = component<{ title : string, subtitle : string }>((props) => {


    useInterval(() => console.log('hello'), 1000)
    return <div className="rounded-md border border-slate-200 p-2 text-md text-slate-800 flex flex-col w-fit">
        <div className="font-semibold text-lg"> {props.title} </div>
        <div> {props.subtitle} </div>
        <div> {props.children}</div>
    </div>
})


export const ShowExample = component(() => {
    const [condition, toggle] = bool(true)


    return <div> 
    <Show when={condition} >

        <Card title="Hello" subtitle="World" >hey!</Card>
        <div> second child</div>
        </Show>

        <button onClick={toggle} > toggle </button>

        </div>
})