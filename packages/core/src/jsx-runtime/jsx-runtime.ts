/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  SimpleVComponent,
  SimpleVComponent,
} from 'src/component/v-component';
import type { ComponentFn } from '../component';
import { button2, div2, img2, input2, li2, span2, ul2 } from '../dom';
import type { VDomComponent } from 'src/dom/create-dom-element';

interface HTMLElementTags {
  // a: AnchorHTMLAttributes<HTMLAnchorElement>;
  // abbr: HTMLAttributes<HTMLElement>;
  // address: HTMLAttributes<HTMLElement>;
  // area: AreaHTMLAttributes<HTMLAreaElement>;
  // article: HTMLAttributes<HTMLElement>;
  // aside: HTMLAttributes<HTMLElement>;
  // audio: AudioHTMLAttributes<HTMLAudioElement>;
  // b: HTMLAttributes<HTMLElement>;
  // base: BaseHTMLAttributes<HTMLBaseElement>;
  // bdi: HTMLAttributes<HTMLElement>;
  // bdo: HTMLAttributes<HTMLElement>;
  // blockquote: BlockquoteHTMLAttributes<HTMLElement>;
  // body: HTMLAttributes<HTMLBodyElement>;
  // br: HTMLAttributes<HTMLBRElement>;
  button: Parameters<typeof button2>[0];
  // canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
  // caption: HTMLAttributes<HTMLElement>;
  // cite: HTMLAttributes<HTMLElement>;
  // code: HTMLAttributes<HTMLElement>;
  // col: ColHTMLAttributes<HTMLTableColElement>;
  // colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
  // data: DataHTMLAttributes<HTMLElement>;
  // datalist: HTMLAttributes<HTMLDataListElement>;
  // dd: HTMLAttributes<HTMLElement>;
  // del: HTMLAttributes<HTMLElement>;
  // details: DetailsHtmlAttributes<HTMLDetailsElement>;
  // dfn: HTMLAttributes<HTMLElement>;
  // dialog: DialogHtmlAttributes<HTMLDialogElement>;
  div: Parameters<typeof div2>[0];
  // dl: HTMLAttributes<HTMLDListElement>;
  // dt: HTMLAttributes<HTMLElement>;
  // em: HTMLAttributes<HTMLElement>;
  // embed: EmbedHTMLAttributes<HTMLEmbedElement>;
  // fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
  // figcaption: HTMLAttributes<HTMLElement>;
  // figure: HTMLAttributes<HTMLElement>;
  // footer: HTMLAttributes<HTMLElement>;
  // form: FormHTMLAttributes<HTMLFormElement>;
  // h1: HTMLAttributes<HTMLHeadingElement>;
  // h2: HTMLAttributes<HTMLHeadingElement>;
  // h3: HTMLAttributes<HTMLHeadingElement>;
  // h4: HTMLAttributes<HTMLHeadingElement>;
  // h5: HTMLAttributes<HTMLHeadingElement>;
  // h6: HTMLAttributes<HTMLHeadingElement>;
  // head: HTMLAttributes<HTMLHeadElement>;
  // header: HTMLAttributes<HTMLElement>;
  // hgroup: HTMLAttributes<HTMLElement>;
  // hr: HTMLAttributes<HTMLHRElement>;
  // html: HTMLAttributes<HTMLHtmlElement>;
  // i: HTMLAttributes<HTMLElement>;
  // iframe: IframeHTMLAttributes<HTMLIFrameElement>;
  img: Parameters<typeof img2>[0];
  input: Parameters<typeof input2>[0];
  // ins: InsHTMLAttributes<HTMLModElement>;
  // kbd: HTMLAttributes<HTMLElement>;
  // label: LabelHTMLAttributes<HTMLLabelElement>;
  // legend: HTMLAttributes<HTMLLegendElement>;
  li: Parameters<typeof li2>[0];
  // link: LinkHTMLAttributes<HTMLLinkElement>;
  // main: HTMLAttributes<HTMLElement>;
  // map: MapHTMLAttributes<HTMLMapElement>;
  // mark: HTMLAttributes<HTMLElement>;
  // menu: MenuHTMLAttributes<HTMLElement>;
  // meta: MetaHTMLAttributes<HTMLMetaElement>;
  // meter: MeterHTMLAttributes<HTMLElement>;
  // nav: HTMLAttributes<HTMLElement>;
  // noscript: HTMLAttributes<HTMLElement>;
  // object: ObjectHTMLAttributes<HTMLObjectElement>;
  // ol: OlHTMLAttributes<HTMLOListElement>;
  // optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
  // option: OptionHTMLAttributes<HTMLOptionElement>;
  // output: OutputHTMLAttributes<HTMLElement>;
  // p: HTMLAttributes<HTMLParagraphElement>;
  // picture: HTMLAttributes<HTMLElement>;
  // pre: HTMLAttributes<HTMLPreElement>;
  // progress: ProgressHTMLAttributes<HTMLProgressElement>;
  // q: QuoteHTMLAttributes<HTMLQuoteElement>;
  // rp: HTMLAttributes<HTMLElement>;
  // rt: HTMLAttributes<HTMLElement>;
  // ruby: HTMLAttributes<HTMLElement>;
  // s: HTMLAttributes<HTMLElement>;
  // samp: HTMLAttributes<HTMLElement>;
  // script: ScriptHTMLAttributes<HTMLScriptElement>;
  // search: HTMLAttributes<HTMLElement>;
  // section: HTMLAttributes<HTMLElement>;
  // select: SelectHTMLAttributes<HTMLSelectElement>;
  // slot: HTMLSlotElementAttributes;
  // small: HTMLAttributes<HTMLElement>;
  // source: SourceHTMLAttributes<HTMLSourceElement>;
  span: Parameters<typeof span2>[0];
  // strong: HTMLAttributes<HTMLElement>;
  // style: StyleHTMLAttributes<HTMLStyleElement>;
  // sub: HTMLAttributes<HTMLElement>;
  // summary: HTMLAttributes<HTMLElement>;
  // sup: HTMLAttributes<HTMLElement>;
  // table: HTMLAttributes<HTMLTableElement>;
  // tbody: HTMLAttributes<HTMLTableSectionElement>;
  // td: TdHTMLAttributes<HTMLTableCellElement>;
  // template: TemplateHTMLAttributes<HTMLTemplateElement>;
  // textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  // tfoot: HTMLAttributes<HTMLTableSectionElement>;
  // th: ThHTMLAttributes<HTMLTableCellElement>;
  // thead: HTMLAttributes<HTMLTableSectionElement>;
  // time: TimeHTMLAttributes<HTMLElement>;
  // title: HTMLAttributes<HTMLTitleElement>;
  // tr: HTMLAttributes<HTMLTableRowElement>;
  // track: TrackHTMLAttributes<HTMLTrackElement>;
  // u: HTMLAttributes<HTMLElement>;
  ul: Parameters<typeof ul2>[0];
  // var: HTMLAttributes<HTMLElement>;
  // video: VideoHTMLAttributes<HTMLVideoElement>;
  // wbr: HTMLAttributes<HTMLElement>;
}

declare global {
  module JSX {
    interface IntrinsicElements extends HTMLElementTags {}
  }
}

const domComponentMap: Partial<
  Record<
    keyof HTMLElementTagNameMap,
    (...params: any[]) => VDomComponent<keyof HTMLElementTagNameMap>
  >
> = {
  div: div2,
  button: button2,
  input: input2 as any,
  img: img2,
  li: li2,
  ul: ul2,
  span: span2,
};

export const jsxComponent = (
  componentFn: keyof typeof domComponentMap | ComponentFn,
  extendedProps: Record<string, any> | null,
  ..._children: any[]
):
  | SimpleVComponent
  | SimpleVComponent
  | VDomComponent<keyof typeof domComponentMap> => {
  // TODO: unify API for classes.
  // We have 'classes' for dom elements and 'className' for components
  const { className, onClick, ...props } = extendedProps || {};

  if (typeof componentFn === 'string' && componentFn in domComponentMap) {
    const domComponent =
      domComponentMap[componentFn as keyof typeof domComponentMap];

    console.log(extendedProps);

    if (!domComponent) throw new Error('Component not found');

    return domComponent({
      ...props,
      children: _children,
      classes: className,
      handlers: { click: onClick },
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

  console.groupEnd();

  return component as any;
};
