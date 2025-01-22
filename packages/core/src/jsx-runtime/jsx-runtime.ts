/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SimpleVComponent } from '../component/v-component';
import { type ComponentFn } from '../component';
import {
  a2,
  br,
  button2,
  code,
  div2,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img2,
  input2,
  li2,
  p2,
  span2,
  strong,
  ul2,
} from '../dom';
import type {
  AddClassesArgs,
  ComponentChildren,
  EventHandlerKey,
  VDomComponent,
} from '../dom/create-dom-element';
import type { InputReactive } from 'src/reactive';
import { extractEventHandlers } from './utils';
import type { HTMLInputElementOptions } from '../dom/input';

interface HTMLElementTags {
  a: AnchorHtmlAttributes;
  // abbr: HtmlAttributes<HTMLElement>;
  // address: HtmlAttributes<HTMLElement>;
  // area: AreaHtmlAttributes<HTMLAreaElement>;
  // article: HtmlAttributes<HTMLElement>;
  // aside: HtmlAttributes<HTMLElement>;
  // audio: AudioHtmlAttributes<HTMLAudioElement>;
  // b: HtmlAttributes<HTMLElement>;
  // base: BaseHtmlAttributes<HTMLBaseElement>;
  // bdi: HtmlAttributes<HTMLElement>;
  // bdo: HtmlAttributes<HTMLElement>;
  // blockquote: BlockquoteHtmlAttributes<HTMLElement>;
  // body: HtmlAttributes<HTMLBodyElement>;
  br: HtmlAttributes;
  button: HtmlAttributes;
  // canvas: CanvasHtmlAttributes<HTMLCanvasElement>;
  // caption: HtmlAttributes<HTMLElement>;
  // cite: HtmlAttributes<HTMLElement>;
  code: HtmlAttributes;
  // col: ColHtmlAttributes<HTMLTableColElement>;
  // colgroup: ColgroupHtmlAttributes<HTMLTableColElement>;
  // data: DataHtmlAttributes<HTMLElement>;
  // datalist: HtmlAttributes<HTMLDataListElement>;
  // dd: HtmlAttributes<HTMLElement>;
  // del: HtmlAttributes<HTMLElement>;
  // details: DetailsHtmlAttributes<HTMLDetailsElement>;
  // dfn: HtmlAttributes<HTMLElement>;
  // dialog: DialogHtmlAttributes<HTMLDialogElement>;
  div: HtmlAttributes;
  // dl: HtmlAttributes<HTMLDListElement>;
  // dt: HtmlAttributes<HTMLElement>;
  // em: HtmlAttributes<HTMLElement>;
  // embed: EmbedHtmlAttributes<HTMLEmbedElement>;
  // fieldset: FieldsetHtmlAttributes<HTMLFieldSetElement>;
  // figcaption: HtmlAttributes<HTMLElement>;
  // figure: HtmlAttributes<HTMLElement>;
  // footer: HtmlAttributes<HTMLElement>;
  // form: FormHtmlAttributes<HTMLFormElement>;
  h1: HtmlAttributes;
  h2: HtmlAttributes;
  h3: HtmlAttributes;
  h4: HtmlAttributes;
  h5: HtmlAttributes;
  h6: HtmlAttributes;
  // head: HtmlAttributes<HTMLHeadElement>;
  // header: HtmlAttributes<HTMLElement>;
  // hgroup: HtmlAttributes<HTMLElement>;
  // hr: HtmlAttributes<HTMLHRElement>;
  // html: HtmlAttributes<HTMLHtmlElement>;
  // i: HtmlAttributes<HTMLElement>;
  // iframe: IframeHtmlAttributes<HTMLIFrameElement>;
  img: ImageHtmlAttributes;
  input: InputHtmlAttributes;
  // ins: InsHtmlAttributes<HTMLModElement>;
  // kbd: HtmlAttributes<HTMLElement>;
  // label: LabelHtmlAttributes<HTMLLabelElement>;
  // legend: HtmlAttributes<HTMLLegendElement>;
  li: HtmlAttributes;
  // link: LinkHtmlAttributes<HTMLLinkElement>;
  // main: HtmlAttributes<HTMLElement>;
  // map: MapHtmlAttributes<HTMLMapElement>;
  // mark: HtmlAttributes<HTMLElement>;
  // menu: MenuHtmlAttributes<HTMLElement>;
  // meta: MetaHtmlAttributes<HTMLMetaElement>;
  // meter: MeterHtmlAttributes<HTMLElement>;
  // nav: HtmlAttributes<HTMLElement>;
  // noscript: HtmlAttributes<HTMLElement>;
  // object: ObjectHtmlAttributes<HTMLObjectElement>;
  // ol: OlHtmlAttributes<HTMLOListElement>;
  // optgroup: OptgroupHtmlAttributes<HTMLOptGroupElement>;
  // option: OptionHtmlAttributes<HTMLOptionElement>;
  // output: OutputHtmlAttributes<HTMLElement>;
  p: HtmlAttributes;
  // picture: HtmlAttributes<HTMLElement>;
  // pre: HtmlAttributes<HTMLPreElement>;
  // progress: ProgressHtmlAttributes<HTMLProgressElement>;
  // q: QuoteHtmlAttributes<HTMLQuoteElement>;
  // rp: HtmlAttributes<HTMLElement>;
  // rt: HtmlAttributes<HTMLElement>;
  // ruby: HtmlAttributes<HTMLElement>;
  // s: HtmlAttributes<HTMLElement>;
  // samp: HtmlAttributes<HTMLElement>;
  // script: ScriptHtmlAttributes<HTMLScriptElement>;
  // search: HtmlAttributes<HTMLElement>;
  // section: HtmlAttributes<HTMLElement>;
  // select: SelectHtmlAttributes<HTMLSelectElement>;
  // slot: HTMLSlotElementAttributes;
  // small: HtmlAttributes<HTMLElement>;
  // source: SourceHtmlAttributes<HTMLSourceElement>;
  span: HtmlAttributes;
  // strong: HtmlAttributes<HTMLElement>;
  // style: StyleHtmlAttributes<HTMLStyleElement>;
  // sub: HtmlAttributes<HTMLElement>;
  // summary: HtmlAttributes<HTMLElement>;
  // sup: HtmlAttributes<HTMLElement>;
  // table: HtmlAttributes<HTMLTableElement>;
  // tbody: HtmlAttributes<HTMLTableSectionElement>;
  // td: TdHtmlAttributes<HTMLTableCellElement>;
  // template: TemplateHtmlAttributes<HTMLTemplateElement>;
  // textarea: TextareaHtmlAttributes<HTMLTextAreaElement>;
  // tfoot: HtmlAttributes<HTMLTableSectionElement>;
  // th: ThHtmlAttributes<HTMLTableCellElement>;
  // thead: HtmlAttributes<HTMLTableSectionElement>;
  // time: TimeHtmlAttributes<HTMLElement>;
  // title: HtmlAttributes<HTMLTitleElement>;
  // tr: HtmlAttributes<HTMLTableRowElement>;
  // track: TrackHtmlAttributes<HTMLTrackElement>;
  // u: HtmlAttributes<HTMLElement>;
  strong: HtmlAttributes;
  ul: HtmlAttributes;
  // var: HtmlAttributes<HTMLElement>;
  // video: VideoHtmlAttributes<HTMLVideoElement>;
  // wbr: HtmlAttributes<HTMLElement>;
}

declare global {
  module JSX {
    interface IntrinsicElements extends HTMLElementTags {}
  }
}

type HtmlAttributes = Partial<
  {
    className: AddClassesArgs;
    // styles
  } & Record<EventHandlerKey, () => void>
>;

type InputHtmlAttributes = HtmlAttributes &
  Partial<{
    value: InputReactive<string | number>;
  }> &
  HTMLInputElementOptions;

type ImageHtmlAttributes = HtmlAttributes & Parameters<typeof img2>[0];

type AnchorHtmlAttributes = HtmlAttributes & Parameters<typeof a2>[0];

const domComponentMap = {
  a: a2,
  div: div2,
  button: button2,
  input: input2,
  img: img2,
  li: li2,
  ul: ul2,
  span: span2,
  strong: strong,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  p: p2,
  code: code,
  br: br,
} as const;

export const jsxComponent = (
  componentFn: keyof typeof domComponentMap | ComponentFn,
  extendedProps: Record<string, any> | null,
  ..._children: ComponentChildren
):
  | SimpleVComponent
  | SimpleVComponent
  | VDomComponent<keyof typeof domComponentMap> => {
  const { className, ...props } = extendedProps || {};

  const handlers = extractEventHandlers(extendedProps);

  if (typeof componentFn === 'string' && componentFn in domComponentMap) {
    const domComponent =
      domComponentMap[componentFn as keyof typeof domComponentMap];

    if (!domComponent) throw new Error('Component not found');

    return domComponent({
      ...props,
      children: _children,
      className,
      handlers,
    }) as any;
  }

  if (typeof componentFn === 'string') {
    throw new Error(`Component ${componentFn} not yet supported`);
  }

  const children = _children || [];

  const component = componentFn({
    ...props,
    className,
    children: children,
  });

  return component as any;
};
