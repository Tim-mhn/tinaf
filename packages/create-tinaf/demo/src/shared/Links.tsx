import { component } from 'tinaf/component';
import {  RouterLink } from 'tinaf/router';

export const Links = component(() => {



return <div className="flex gap-4 p-8 h-[140px] items-center  border-t border-slate-800">


<RouterLink className="cursor-pointer underline" to="/">Home</RouterLink>

<RouterLink className="cursor-pointer underline" to="/todos">Todo list</RouterLink>

</div>

})