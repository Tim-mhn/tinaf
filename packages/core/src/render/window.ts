import type { TinafApp } from '../render';

export interface IWindow {
  attachApp(app: TinafApp): void;
  onLoad(callback: () => void): void;
}

export interface IDocument {
  getElementById(id: string): HTMLElement | null;
  createComment(comment: string): Comment;
  createTextNode(text: string): Text;
}
