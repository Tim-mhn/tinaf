import { component } from 'tinaf/component';
import { injectRouter } from 'tinaf/router';

export const Links = component(() => {
  const router = injectRouter();



return <div className="flex gap-4 p-8 h-[140px] items-center  border-t border-slate-800">

<div className="cursor-pointer underline" onClick={() => router.navigate('/')}>Home</div>

<div className="cursor-pointer underline" onClick={() => router.navigate('/todos')}> Todo List </div>
</div>

})