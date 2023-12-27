import { randomId } from "./render-v2";

type RenderFunction = () => ReturnType<Component>;

type VirtualComponentOutput = {
  render: RenderFunction | string;
};

type HtmlComponentOutput = VirtualComponentOutput & {
  isDom: true;
  buildElement(): HTMLElement;
};

type Component = () => VirtualComponentOutput | HtmlComponentOutput;
/**
 *
 *
 *
 *
 * const A = () => {
 *
 *   return {
 *     render: () => div("this is A")
 *   }
 *
 * }
 *
 *
 *
 * const B = () => {
 *
 *
 *     return {
 *        render: () => A
 *     }
 * }
 *
 * const App = () => {
 *
 *
 *  return {
 *
 *     render: () => div(div(B))
 *
 *
 * }
 * }
 *
 *

 */

function buildHtmlComponentByTag(tag: keyof HTMLElementTagNameMap) {
  return (child: string | Component) => {
    const render: RenderFunction | string =
      typeof child === "string" ? child : () => child();

    return () => ({
      isDom: true,
      buildElement: () => document.createElement(tag),
      render,
    });
  };
}

const div: (child: string | Component) => Component =
  buildHtmlComponentByTag("div");
const span = buildHtmlComponentByTag("span");

/**
 * buildVirtualDomFromNode(C)
 *
 * {
 *    isDom: true;
 *    buildElement: () => buildDiv("hello");
 *
 * }
 *
 * buildVirtualDomFromNode(B)
 *
 * {
 *     isDom: false,
 *     child: --> buildVirtualDomFromNode(C)
 * }
 * @param node
 * @returns
 */

const C: Component = () => {
  return {
    render: "hello",
  };
};

const D: Component = () => {
  return {
    render: () => C(),
  };
};

const E: Component = () => {
  return {
    render: () => D(),
  };
};

const A: Component = () => {
  return {
    render: () => div(E)(), // this will be refactored to div(E) as soon as we can probably use child components in render functions
  };
};

type VirtualDom =
  | {
      id: string;
      isDom: boolean;
      child?: VirtualDom;
      buildElement?: () => HTMLElement;
    }
  | string;
function buildVirtualDomFromNode(component: Component): string | VirtualDom {
  const {
    render: child,
    isDom,
    buildElement,
  } = component() as any as Pick<HtmlComponentOutput, "render"> &
    Partial<Pick<HtmlComponentOutput, "buildElement">> & { isDom?: boolean }; // TS hack, to refacto

  const id = randomId();

  if (typeof child === "string") return child;

  return {
    id,
    isDom: isDom || false,
    child: buildVirtualDomFromNode(child),
    buildElement: buildElement ?? undefined,
  };
}

console.log(buildVirtualDomFromNode(E));
console.log(buildVirtualDomFromNode(A));

/**
 *
 * expected:
 * {
 *    id: "xxx",
 *    isDom: true,
 *    buildElement: () => document.buildElement("div"),
 *    child: {
 *       id: "xxx",
 *       isDom: false,
 *       child: {
 *          id: "xxx",
 *          isDom: false,
 *          child: {
 *              isDom: true,
 *              buildElement: () => document.buildElement("span")
 *          }
 *       }
 *    }
 * }
 */
