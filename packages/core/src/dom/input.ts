import type { VComponent, WithHtml } from '../component/component';
import { InputReactive } from '../reactive';
import {
  type AddClassesArgs,
  type EventHandlers,
  addEventListenersToElement,
} from './create-dom-element';
import { type AddStylesArgs, addStylesToElement } from './styles';
import { addClassToElement } from './classes';
import { objectKeys } from '../utils/object';

export type HTMLInputElementOptions = {
  placeholder: string;
};
export const input = <T extends string | number>(
  value: InputReactive<T>,
  options: Partial<HTMLInputElementOptions> = {}
): VInputComponent<T> => {
  return new VInputComponent(value, options);
};

// TODO: make the inputs correctly reactive and stop breaking state & UI
export class VInputComponent<T extends string | number> implements VComponent {
  private _html!: HTMLInputElement;

  readonly __type = 'V_COMPONENT';

  get html() {
    return this._html;
  }

  addClass(newClasses: AddClassesArgs) {
    this.classes = newClasses;
    return this;
  }

  addStyles(newStyles: AddStylesArgs) {
    this.styles = newStyles;
    return this;
  }

  on(newEventHandlers: EventHandlers) {
    this.handlers = newEventHandlers;
    return this;
  }

  private _onInputHandler?: (newValue: T) => void;
  onInput(handler: (newValue: T) => void) {
    this._onInputHandler = handler;
    return this;
  }

  constructor(
    private reactiveValue: InputReactive<T>,
    private options: Partial<HTMLInputElementOptions> = {},
    private classes?: AddClassesArgs,
    private styles?: AddStylesArgs,
    private handlers?: EventHandlers
  ) {}

  parent!: WithHtml;

  init(parent: WithHtml) {
    this.parent = parent;
    this.reactiveValue.nonUiValueChanges$.subscribe(() => {
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      parent.html.removeChild(this.html);
      this._html = this.renderOnce();
      parent.html.insertBefore(this.html, [...parent.html.childNodes][index]);
    });
  }

  // FIXME: this as copied from create-dom-element to avoid too much class nesting
  // and add a special behaviour for reactivity for input (only update UI if input value is updated programmatically
  // and only update reactive value if input is updated by user)
  private _renderOnce(): HTMLInputElement {
    const input = document.createElement('input');

    input.setAttribute('x-id', crypto.randomUUID());

    objectKeys(this.options).forEach((key) => {
      const value = this.options[key];
      if (value) input[key] = value;
    });

    const initialValue = this.reactiveValue.value;

    input.value = initialValue.toString();
    if (this.classes) addClassToElement(input, this.classes);
    if (this.handlers) addEventListenersToElement(input, this.handlers);
    if (this.styles) addStylesToElement(input, this.styles);
    return input;
  }

  renderOnce(): HTMLInputElement {
    const html = this._renderOnce();

    html.addEventListener('input', (e) => {
      const newValue = (e.target as HTMLInputElement).value;
      const formattedNewValue =
        typeof this.reactiveValue.value === 'number'
          ? Number.parseFloat(newValue)
          : newValue;
      this._onInputHandler?.(formattedNewValue as T);
      this.reactiveValue.update(formattedNewValue as T, { fromUI: true });
    });

    this._html = html;

    return html;
  }
}
