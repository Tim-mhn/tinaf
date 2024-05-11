import { Subject } from 'rxjs';
import type { VComponent } from 'src/component';
import type { Url } from 'url';

type RouterConfig = Array<{ path: string; component: () => VComponent }>;

export class Router {
  constructor(
    // private container: Container,
    private config: RouterConfig // private renderFn: (component: Component, parent: Container) => any
  ) {}

  private _route$ = new Subject<Location>();

  public route$ = this._route$.asObservable();

  getCurrentUrl() {
    return window.location;
  }

  private _intialized = false;
  init() {
    if (this._intialized) return;

    this._intialized = true;
    window.addEventListener('popstate', () => {
      this._route$.next(window.location);
    });
  }

  getComponentForPath(path: string) {
    const route = this.config.find((route) => route.path === path);
    if (!route) {
      console.warn(
        `[Tinaf Router] Could not find matching route for path ${path}`
      );
      return null;
    }

    return route.component;
  }

  private activePage: any;

  navigate(url: string) {
    // if (this.activePage) this.activePage.destroy();
    // const route = this.config.find((route) => route.path === url);

    // if (!route)
    //   throw new Error(`Could not find matching route for url ${url} `);

    // // this.renderFn(route.component, this.container);
    // this.activePage = route.component;
    const UNUSED_PARAM = '';
    history.pushState({}, UNUSED_PARAM, url);
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
  }
}

class RouterBuilder {
  config: RouterConfig = [];

  withConfig(config: RouterConfig) {
    this.config = config;
    return this;
  }

  // renderFn: any;

  // withRenderFn(renderFn: RenderFn) {
  //   this.renderFn = renderFn;
  //   return this;
  // }

  build() {
    return new Router(this.config);
  }
}

export const routerBuilder = () => new RouterBuilder();
