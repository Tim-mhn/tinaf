export type WithHtml = {
  html: HTMLElement;
};

export interface ComponentV2 {
  init(parent: WithHtml): void;
  renderOnce(): HTMLElement | Comment;
  __type: 'componentV2';
  html: HTMLElement | Comment;
}

/**
 * NB: not sure if this is the right interface to use. Mounting requires to also render some stuff on the DOM
 */
