import { component } from "tinaf/component";
import { RouterView } from "tinaf/router";
import { Links } from "./shared/Links";

export const App = component(() => {
    return (
      <div className="h-screen w-screen text-slate-800 bg-white flex flex-col">
        <div className="flex w-full p-4  items-center justify-start font-light text-3xl border-b border-slate-800">
          Welcome to TINAF starting app
        </div>
  
        <div className="flex-grow px-4 py-16 flex flex-col">
          <RouterView />
        </div>
        <Links />
      </div>
    );
  });