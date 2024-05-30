import type { TinafApp } from '../render';

export interface IWindow {
  attachApp(app: TinafApp): void;
  onLoad(callback: () => void): void;
  load(): void;
}

export interface IDocument {
  getElementById(id: string): HTMLElement | null;
  createComment(comment: string): Comment;
  createTextNode(text: string): Text;
  createElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T
  ): HTMLElementTagNameMap[T];
}
