import { ComponentV2, WithHtml } from '../component/component';
import { InputReactive } from '../reactive';
import { Component } from '../render';
import {
  AddClassesArgs,
  EventHandlers,
  addEventListenersToElement,
} from './create-dom-element';
import { AddStylesArgs, addStylesToElement } from './styles';
import { addClassToElement } from './classes';

export const input = <T extends string | number>(value: InputReactive<T>) => {
  return new VInputComponent(value);
};

// TODO: make the inputs correctly reactive and stop breaking state & UI
class VInputComponent<T extends string | number> implements ComponentV2 {
  private _html!: HTMLInputElement;

  readonly __type = 'componentV2';

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

  constructor(
    private reactiveValue: InputReactive<T>,
    private classes?: AddClassesArgs,
    private styles?: AddStylesArgs,
    private handlers?: EventHandlers
  ) {}

  init(parent: WithHtml) {
    this.reactiveValue.nonUiValueChanges$.subscribe(() => {
      const index = [...parent.html.childNodes].findIndex(
        (n) => n === this.html
      );
      console.log(this.html);
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
      console.log({ newValue });
      const formattedNewValue =
        typeof this.reactiveValue.value === 'number'
          ? Number.parseFloat(newValue)
          : newValue;
      this.reactiveValue.update(formattedNewValue as T, { fromUI: true });
    });

    this._html = html;

    return html;
  }
}
