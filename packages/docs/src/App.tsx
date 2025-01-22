import { component } from 'tinaf/component';
import { RouterLink, RouterView } from 'tinaf/router';

const Header = component(() => {
  return (
    <div className="flex w-full md:w-fit  gap-32 justify-between items-center px-16 border-b border-gray-700 py-4 text-white">
      <RouterLink
        classes="hover:underline underline-offset-4 cursor-pointer text-4xl"
        to="/"
      >
        Tinaf
      </RouterLink>
      <RouterLink
        classes="hover:underline underline-offset-4 cursor-pointer text-2xl"
        to="/docs"
      >
        Docs
      </RouterLink>
    </div>
  );
});
export const App = component(() => {
  return (
    <div className="flex flex-col gap-2 md:gap-20 h-screen items-center  w-screen overflow-x-hidden overflow-y-auto pb-8 bg-neutral-900 text-slate-50">
      <Header />
      <RouterView />
    </div>
  );
});
