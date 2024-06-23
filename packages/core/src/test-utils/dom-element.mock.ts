// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WithHtml } from '../component/component';
import { vi } from 'vitest';
import { fromPartial } from './from-partial';

export const buildMockHtmlElement: () => HTMLElement = () =>
  fromPartial<HTMLElement>({
    removeChild: vi.fn<[any], any>(),
    insertBefore: vi.fn<[any], any>(),
    childNodes: [] as any as NodeListOf<any>,
    append: vi.fn(),
  });

class FakeElement implements HTMLElement {
  align: string;
  alt: string;
  border: string;
  complete: boolean;
  crossOrigin: string | null = '';
  currentSrc: string;
  decoding: 'auto' | 'async' | 'sync';
  fetchPriority: string;
  height: number;
  hspace: number;
  isMap: boolean;
  loading: 'eager' | 'lazy';
  longDesc: string;
  lowsrc: string;
  name: string;
  naturalHeight: number;
  naturalWidth: number;
  referrerPolicy: string;
  sizes: string;
  src: string;
  srcset: string;
  useMap: string;
  vspace: number;
  width: number;
  x: number;
  y: number;
  decode(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error('Method not implemented.');
  }
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown
  ): void {
    throw new Error('Method not implemented.');
  }
  accessKey: string;
  accessKeyLabel: string;
  autocapitalize: string;
  dir: string;
  draggable: boolean;
  hidden: boolean;
  inert: boolean;
  innerText: string;
  lang: string;
  offsetHeight: number;
  offsetLeft: number;
  offsetParent: Element | null;
  offsetTop: number;
  offsetWidth: number;
  outerText: string;
  popover: string | null = '';
  spellcheck: boolean;
  title: string;
  translate: boolean;
  attachInternals(): ElementInternals {
    throw new Error('Method not implemented.');
  }
  click(): void {
    throw new Error('Method not implemented.');
  }
  hidePopover(): void {
    throw new Error('Method not implemented.');
  }
  showPopover(): void {
    throw new Error('Method not implemented.');
  }
  togglePopover(force?: boolean | undefined): boolean {
    throw new Error('Method not implemented.');
  }
  attributes: NamedNodeMap;
  classList = new Set<string>();
  set className(newClass: string) {
    this.classList.clear();
  }

  get className() {
    return [...this.classList.values()].join(' ');
  }
  clientHeight: number;
  clientLeft: number;
  clientTop: number;
  clientWidth: number;
  id: string;
  localName: string;
  namespaceURI: string | null = '';
  onfullscreenchange: ((this: Element, ev: Event) => any) | null;
  onfullscreenerror: ((this: Element, ev: Event) => any) | null;
  outerHTML: string;
  ownerDocument: Document;
  part: DOMTokenList;
  prefix: string | null = '';
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  shadowRoot: ShadowRoot | null;
  slot: string;
  tagName: string;
  attachShadow(init: ShadowRootInit): ShadowRoot {
    throw new Error('Method not implemented.');
  }
  checkVisibility(options?: CheckVisibilityOptions | undefined): boolean {
    throw new Error('Method not implemented.');
  }
  closest<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): HTMLElementTagNameMap[K] | null;
  closest<K extends keyof SVGElementTagNameMap>(
    selector: K
  ): SVGElementTagNameMap[K] | null;
  closest<K extends keyof MathMLElementTagNameMap>(
    selector: K
  ): MathMLElementTagNameMap[K] | null;
  closest<E extends Element = Element>(selectors: string): E | null;
  closest(
    selectors: unknown
  ):
    | E
    | HTMLElementTagNameMap[K]
    | SVGElementTagNameMap[K]
    | MathMLElementTagNameMap[K]
    | null {
    throw new Error('Method not implemented.');
  }
  computedStyleMap(): StylePropertyMapReadOnly {
    throw new Error('Method not implemented.');
  }
  getAttribute(qualifiedName: string): string | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNames(): string[] {
    throw new Error('Method not implemented.');
  }
  getAttributeNode(qualifiedName: string): Attr | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
    throw new Error('Method not implemented.');
  }
  getBoundingClientRect(): DOMRect {
    throw new Error('Method not implemented.');
  }
  getClientRects(): DOMRectList {
    throw new Error('Method not implemented.');
  }
  getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
    throw new Error('Method not implemented.');
  }
  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof MathMLElementTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof HTMLElementDeprecatedTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
  getElementsByTagName(
    qualifiedName: unknown
  ):
    | HTMLCollectionOf<Element>
    | HTMLCollectionOf<HTMLElementTagNameMap[K]>
    | HTMLCollectionOf<SVGElementTagNameMap[K]>
    | HTMLCollectionOf<MathMLElementTagNameMap[K]>
    | HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]> {
    throw new Error('Method not implemented.');
  }
  getElementsByTagNameNS(
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    localName: string
  ): HTMLCollectionOf<HTMLElement>;
  getElementsByTagNameNS(
    namespaceURI: 'http://www.w3.org/2000/svg',
    localName: string
  ): HTMLCollectionOf<SVGElement>;
  getElementsByTagNameNS(
    namespaceURI: 'http://www.w3.org/1998/Math/MathML',
    localName: string
  ): HTMLCollectionOf<MathMLElement>;
  getElementsByTagNameNS(
    namespace: string | null,
    localName: string
  ): HTMLCollectionOf<Element>;
  getElementsByTagNameNS(
    namespace: unknown,
    localName: unknown
  ):
    | HTMLCollectionOf<Element>
    | HTMLCollectionOf<HTMLElement>
    | HTMLCollectionOf<SVGElement>
    | HTMLCollectionOf<MathMLElement> {
    throw new Error('Method not implemented.');
  }
  hasAttribute(qualifiedName: string): boolean {
    throw new Error('Method not implemented.');
  }
  hasAttributeNS(namespace: string | null, localName: string): boolean {
    throw new Error('Method not implemented.');
  }
  hasAttributes(): boolean {
    throw new Error('Method not implemented.');
  }
  hasPointerCapture(pointerId: number): boolean {
    throw new Error('Method not implemented.');
  }
  insertAdjacentElement(
    where: InsertPosition,
    element: Element
  ): Element | null {
    throw new Error('Method not implemented.');
  }
  insertAdjacentHTML(position: InsertPosition, text: string): void {
    throw new Error('Method not implemented.');
  }
  insertAdjacentText(where: InsertPosition, data: string): void {
    throw new Error('Method not implemented.');
  }
  matches(selectors: string): boolean {
    throw new Error('Method not implemented.');
  }
  releasePointerCapture(pointerId: number): void {
    throw new Error('Method not implemented.');
  }
  removeAttribute(qualifiedName: string): void {
    throw new Error('Method not implemented.');
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throw new Error('Method not implemented.');
  }
  removeAttributeNode(attr: Attr): Attr {
    throw new Error('Method not implemented.');
  }
  requestFullscreen(options?: FullscreenOptions | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  requestPointerLock(): void {
    throw new Error('Method not implemented.');
  }
  scroll(options?: ScrollToOptions | undefined): void;
  scroll(x: number, y: number): void;
  scroll(x?: unknown, y?: unknown): void {
    throw new Error('Method not implemented.');
  }
  scrollBy(options?: ScrollToOptions | undefined): void;
  scrollBy(x: number, y: number): void;
  scrollBy(x?: unknown, y?: unknown): void {
    throw new Error('Method not implemented.');
  }
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions | undefined): void {
    throw new Error('Method not implemented.');
  }
  scrollTo(options?: ScrollToOptions | undefined): void;
  scrollTo(x: number, y: number): void;
  scrollTo(x?: unknown, y?: unknown): void {
    throw new Error('Method not implemented.');
  }

  setAttribute(qualifiedName: string, value: string): void {
    return vi.fn()();
  }
  setAttributeNS(
    namespace: string | null,
    qualifiedName: string,
    value: string
  ): void {
    throw new Error('Method not implemented.');
  }
  setAttributeNode(attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }
  setAttributeNodeNS(attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }
  setPointerCapture(pointerId: number): void {
    throw new Error('Method not implemented.');
  }
  toggleAttribute(qualifiedName: string, force?: boolean | undefined): boolean {
    throw new Error('Method not implemented.');
  }
  webkitMatchesSelector(selectors: string): boolean {
    throw new Error('Method not implemented.');
  }
  baseURI: string;
  childNodes: NodeListOf<ChildNode>;
  firstChild: ChildNode | null;
  isConnected: boolean;
  lastChild: ChildNode | null;
  nextSibling: ChildNode | null;
  nodeName: string;
  nodeType: number;
  nodeValue: string | null = '';
  parentElement: HTMLElement | null;
  parentNode: ParentNode | null;
  previousSibling: ChildNode | null;
  textContent: string | null = '';
  appendChild<T extends Node>(node: T): T {
    throw new Error('Method not implemented.');
  }
  cloneNode(deep?: boolean | undefined): Node {
    throw new Error('Method not implemented.');
  }
  compareDocumentPosition(other: Node): number {
    throw new Error('Method not implemented.');
  }
  contains(other: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  getRootNode(options?: GetRootNodeOptions | undefined): Node {
    throw new Error('Method not implemented.');
  }
  hasChildNodes(): boolean {
    throw new Error('Method not implemented.');
  }
  insertBefore<T extends Node>(node: T, child: Node | null): T {
    throw new Error('Method not implemented.');
  }
  isDefaultNamespace(namespace: string | null): boolean {
    throw new Error('Method not implemented.');
  }
  isEqualNode(otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  isSameNode(otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  lookupNamespaceURI(prefix: string | null): string | null {
    throw new Error('Method not implemented.');
  }
  lookupPrefix(namespace: string | null): string | null {
    throw new Error('Method not implemented.');
  }
  normalize(): void {
    throw new Error('Method not implemented.');
  }
  removeChild<T extends Node>(child: T): T {
    throw new Error('Method not implemented.');
  }
  replaceChild<T extends Node>(node: Node, child: T): T {
    throw new Error('Method not implemented.');
  }
  readonly ELEMENT_NODE = 1;
  readonly ATTRIBUTE_NODE = 2;
  readonly TEXT_NODE = 3;
  readonly CDATA_SECTION_NODE = 4;
  readonly ENTITY_REFERENCE_NODE = 5;
  readonly ENTITY_NODE = 6;
  readonly PROCESSING_INSTRUCTION_NODE = 7;
  readonly COMMENT_NODE = 8;
  readonly DOCUMENT_NODE = 9;
  readonly DOCUMENT_TYPE_NODE = 10;
  readonly DOCUMENT_FRAGMENT_NODE = 11;
  readonly NOTATION_NODE = 12;
  readonly DOCUMENT_POSITION_DISCONNECTED = 1;
  readonly DOCUMENT_POSITION_PRECEDING = 2;
  readonly DOCUMENT_POSITION_FOLLOWING = 4;
  readonly DOCUMENT_POSITION_CONTAINS = 8;
  readonly DOCUMENT_POSITION_CONTAINED_BY = 16;
  readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
  dispatchEvent(event: Event): boolean {
    throw new Error('Method not implemented.');
  }
  ariaAtomic: string | null = '';
  ariaAutoComplete: string | null = '';
  ariaBusy: string | null = '';
  ariaChecked: string | null = '';
  ariaColCount: string | null = '';
  ariaColIndex: string | null = '';
  ariaColSpan: string | null = '';
  ariaCurrent: string | null = '';
  ariaDescription: string | null = '';
  ariaDisabled: string | null = '';
  ariaExpanded: string | null = '';
  ariaHasPopup: string | null = '';
  ariaHidden: string | null = '';
  ariaInvalid: string | null = '';
  ariaKeyShortcuts: string | null = '';
  ariaLabel: string | null = '';
  ariaLevel: string | null = '';
  ariaLive: string | null = '';
  ariaModal: string | null = '';
  ariaMultiLine: string | null = '';
  ariaMultiSelectable: string | null = '';
  ariaOrientation: string | null = '';
  ariaPlaceholder: string | null = '';
  ariaPosInSet: string | null = '';
  ariaPressed: string | null = '';
  ariaReadOnly: string | null = '';
  ariaRequired: string | null = '';
  ariaRoleDescription: string | null = '';
  ariaRowCount: string | null = '';
  ariaRowIndex: string | null = '';
  ariaRowSpan: string | null = '';
  ariaSelected: string | null = '';
  ariaSetSize: string | null = '';
  ariaSort: string | null = '';
  ariaValueMax: string | null = '';
  ariaValueMin: string | null = '';
  ariaValueNow: string | null = '';
  ariaValueText: string | null = '';
  role: string | null = '';
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions | undefined
  ): Animation {
    throw new Error('Method not implemented.');
  }
  getAnimations(options?: GetAnimationsOptions | undefined): Animation[] {
    throw new Error('Method not implemented.');
  }
  after(...nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }
  before(...nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }
  remove(): void {
    throw new Error('Method not implemented.');
  }
  replaceWith(...nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }
  innerHTML: string = '';
  nextElementSibling: Element | null = null;
  previousElementSibling: Element | null = null;
  childElementCount: number = 0;
  children: HTMLCollection;
  firstElementChild: Element | null = null;
  lastElementChild: Element | null = null;
  append(...nodes: (string | Node)[]): void {}
  prepend(...nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }
  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof SVGElementTagNameMap>(
    selectors: K
  ): SVGElementTagNameMap[K] | null;
  querySelector<K extends keyof MathMLElementTagNameMap>(
    selectors: K
  ): MathMLElementTagNameMap[K] | null;
  querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K
  ): HTMLElementDeprecatedTagNameMap[K] | null;
  querySelector<E extends Element = Element>(selectors: string): E | null;
  querySelector(
    selectors: unknown
  ):
    | E
    | HTMLElementTagNameMap[K]
    | SVGElementTagNameMap[K]
    | MathMLElementTagNameMap[K]
    | HTMLElementDeprecatedTagNameMap[K]
    | null {
    throw new Error('Method not implemented.');
  }
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ): NodeListOf<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(
    selectors: K
  ): NodeListOf<SVGElementTagNameMap[K]>;
  querySelectorAll<K extends keyof MathMLElementTagNameMap>(
    selectors: K
  ): NodeListOf<MathMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(
    selectors: K
  ): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
  querySelectorAll<E extends Element = Element>(
    selectors: string
  ): NodeListOf<E>;
  querySelectorAll(
    selectors: unknown
  ):
    | NodeListOf<HTMLElementTagNameMap[K]>
    | NodeListOf<SVGElementTagNameMap[K]>
    | NodeListOf<MathMLElementTagNameMap[K]>
    | NodeListOf<HTMLElementDeprecatedTagNameMap[K]>
    | NodeListOf<E> {
    throw new Error('Method not implemented.');
  }
  replaceChildren(...nodes: (string | Node)[]): void {
    throw new Error('Method not implemented.');
  }
  assignedSlot: HTMLSlotElement | null;
  attributeStyleMap: StylePropertyMap;
  style: CSSStyleDeclaration;
  contentEditable: string;
  enterKeyHint: string;
  inputMode: string;
  isContentEditable: boolean;
  onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onanimationcancel:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null;
  onanimationend:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null;
  onanimationiteration:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null;
  onanimationstart:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null;
  onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
  onbeforetoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onerror: OnErrorEventHandler;
  onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
  ongotpointercapture:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null;
  oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onlostpointercapture:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null;
  onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onpointercancel:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null;
  onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onprogress:
    | ((this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any)
    | null;
  onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onscrollend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsecuritypolicyviolation:
    | ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any)
    | null;
  onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
  onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontouchcancel?:
    | ((this: GlobalEventHandlers, ev: TouchEvent) => any)
    | null
    | undefined;
  ontouchend?:
    | ((this: GlobalEventHandlers, ev: TouchEvent) => any)
    | null
    | undefined;
  ontouchmove?:
    | ((this: GlobalEventHandlers, ev: TouchEvent) => any)
    | null
    | undefined;
  ontouchstart?:
    | ((this: GlobalEventHandlers, ev: TouchEvent) => any)
    | null
    | undefined;
  ontransitioncancel:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null;
  ontransitionend:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null;
  ontransitionrun:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null;
  ontransitionstart:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null;
  onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkitanimationiteration:
    | ((this: GlobalEventHandlers, ev: Event) => any)
    | null;
  onwebkitanimationstart:
    | ((this: GlobalEventHandlers, ev: Event) => any)
    | null;
  onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
  autofocus: boolean;
  dataset: DOMStringMap;
  nonce?: string | undefined;
  tabIndex: number;
  blur(): void {
    throw new Error('Method not implemented.');
  }
  focus(options?: FocusOptions | undefined): void {
    throw new Error('Method not implemented.');
  }
}

export const buildMockParent: () => WithHtml = () => ({
  html: buildMockHtmlElement(),
});

export const createFakeElement = <T extends keyof HTMLElementTagNameMap>(
  tagname: T
): HTMLElementTagNameMap[T] =>
  new FakeElement() as any as HTMLElementTagNameMap[T];
