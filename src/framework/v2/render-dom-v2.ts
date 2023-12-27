/**
 *
 *
 *
 * #1 setup() -> return virtual dom
 *
 *
 * vdom = div -> B -> C -> span // only 1 child for no<
 *
 */

function renderToDom(rootComponent: VirtualDomComponent, rootId: string) {
  const domRoot = document.getElementById(rootId);
  if (!domRoot) throw new Error("could not find dom root");

  const html = renderComponentToDom(rootComponent);

  domRoot.appendChild(html);
}

function renderComponentToDom(component: VirtualDomComponent) {
  if (!component.isDom) return renderComponentToDom(component.child);

  const htmlEl = component.buildElement();
  if (component.child) {
    const childHtmlEl = renderComponentToDom(component.child);
    htmlEl.appendChild(childHtmlEl);
  }
  t;
  return htmlEl;
}

export type VirtualDomComponent = VirtualComponent | DomRenderableComponent;

export type VirtualComponent = {
  isDom: false;
  child: VirtualDomComponent;
};

export type DomRenderableComponent = {
  isDom: true;
  child?: VirtualDomComponent;
  buildElement(): HTMLElement;
  appendChild(el: HTMLElement): void;
};

type T = (() => string) & { a: string };

let t: T = {
  a: "hello",
};

t.a = "foo";
