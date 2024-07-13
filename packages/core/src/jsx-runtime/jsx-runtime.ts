/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SimpleVComponent } from '../component/v-component';
import { type ComponentFn } from '../component';
import { button2, div2, img2, input2, li2, span2, ul2 } from '../dom';
import type {
  AddClassesArgs,
  ComponentChildren,
  EventHandlerKey,
  VDomComponent,
} from '../dom/create-dom-element';
import type { InputReactive } from 'src/reactive';
import { extractEventHandlers } from './utils';

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
  button: HtmlAttributes;
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
  div: HtmlAttributes;
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
  img: ImageHtmlAttributes;
  input: InputHtmlAttributes;
  // ins: InsHTMLAttributes<HTMLModElement>;
  // kbd: HTMLAttributes<HTMLElement>;
  // label: LabelHTMLAttributes<HTMLLabelElement>;
  // legend: HTMLAttributes<HTMLLegendElement>;
  li: HtmlAttributes;
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
  span: HtmlAttributes;
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
  ul: HtmlAttributes;
  // var: HTMLAttributes<HTMLElement>;
  // video: VideoHTMLAttributes<HTMLVideoElement>;
  // wbr: HTMLAttributes<HTMLElement>;
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
    placeholder?: string;
  }>;

type ImageHtmlAttributes = HtmlAttributes & Parameters<typeof img2>[0];

const domComponentMap = {
  div: div2,
  button: button2,
  input: input2,
  img: img2,
  li: li2,
  ul: ul2,
  span: span2,
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

  console.group('jsxComponent');
  console.log(componentFn);
  console.log(extendedProps);
  console.log(_children);
  console.groupEnd();

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
