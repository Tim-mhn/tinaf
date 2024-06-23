import {  componentV2 } from 'tinaf/component';
import { injectRouter } from 'tinaf/router';

const HeaderTitle = componentV2(() => {
  const router = injectRouter();

  return <div className="flex items-center gap-3">
    <button className="text-2xl font-semibold" onClick={() => router.navigate('/')}>Marketplace</button>
    <div className="pt-1 text-slate-600">by Tinaf</div>
  </div>
})


export const Header = componentV2(() => {
  return <div className='flex items-center gap-32 border-b border-b-primary p-6 h-20'>
    <HeaderTitle />
  </div>

});
