import { InjectionsManager } from '../common/injections.manager';
import type { VComponent } from '../component';
import { render } from './render';
import type { IDocument, IWindow } from './window';

export class TinafApp {
  constructor(
    private app: () => VComponent,
    private window: IWindow,
    private _doc: IDocument
  ) {}

  private appInjections = new InjectionsManager();

  provide<T>(key: string | symbol, value: T) {
    this.appInjections.provide(key, value);
    return this;
  }

  get<T>(key: string | symbol, defaultValue?: T): T {
    return this.appInjections.get(key, defaultValue);
  }

  render(id: string) {
    this.window.attachApp(this);

    this.window.onLoad(() => {
      const container = this._doc.getElementById(id) as HTMLElement;

      render(this.app(), container);
    });
  }
}
