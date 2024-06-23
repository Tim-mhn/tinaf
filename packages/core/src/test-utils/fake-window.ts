import { logger } from '../common';
import type { TinafApp } from '../render';
import type { IWindow } from '../render/window';

export class FakeWindow implements IWindow {
  private app!: TinafApp;

  attachApp(app: TinafApp): void {
    this.app = app;
  }

  private callback?: () => void;
  onLoad(callback: () => void): void {
    this.callback = callback;
  }

  load(): void {
    if (!this.callback) {
      logger.error(
        'Trying to load fake window without callback. Have you called onLoad ?'
      );
      return;
    }

    this.callback();
  }
}
