import { component } from "tinaf/component";
import { RouterLink, type PageComponent } from "tinaf/router";

export const AboutTinafPage: PageComponent = component(() => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="italic font-semibold">TINAF</span> is a front-end library to build interactive interfaces with
        <span className="font-semibold "> fine-grained reactivity</span>
        <div>It takes inspiration on React, SolidJS and VueJS</div>
      </div>
      <div>
        <div>Current features</div>

        <ul className="list-disc p-2">
          <li>Reactive UI</li>
          <li>Event listeners</li>
          <li>Dynamic classes and styles</li>
          <li>Client-side routing</li>
          <li>Control-flow (if/else and for)</li>
        </ul>
      </div>
      <div>
        <div>In progress </div>

        <ul className="list-disc p-2">
          <li>HTTP client</li>
          <li>Form utilities</li>
          <li>Named slots</li>
          <li>Shared global state</li>
        </ul>
      </div>
    </div>
  );
});
