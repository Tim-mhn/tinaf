import { getReactives, Reactive, clearReactives, reactive } from "../reactive";

export const randomInteger = ({ max = 10, min = 0 } = {}) =>
  min < max ? Math.floor(Math.random() * (max - min)) + min : -1;

export const randomId = () => randomInteger({ max: 1e6, min: 1 }).toString();

const REACTIVES_RENDER_FUNCTIONS_BINDINGS: Record<
  string,
  {
    reactives: Reactive<any>[];
    renderFn: RenderFunction;
  }
> = {};

function renderComponent(component: Component) {
  if (typeof component === "string") return component;

  let setup = component; // will return () => string or () => Component
  let render: string | RenderFunction = setup(); // render is string or () => string | component

  if (typeof render !== "function") return render;

  clearReactives();
  const componentId = randomId();
  REACTIVES_RENDER_FUNCTIONS_BINDINGS[componentId] = {
    reactives: getReactives(),
    renderFn: render,
  };

  const child = render();
  return renderComponent(child);
}

const D: Component = () => {
  return () => "d";
};

const C: Component = () => {
  const c = reactive("c");

  return () => D;
};

const B: Component = () => {
  const b = reactive("b");

  return () => C;
};

const A: Component = () => {
  const a = reactive("a");
  return () => B;
};

export type RenderFunction = () => RenderFunction | string;

export type Component = RenderFunction | string;

// render();
// renderComponent(A);
// console.log(REACTIVES_RENDER_FUNCTIONS_BINDINGS);
