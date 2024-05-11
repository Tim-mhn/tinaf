import { Subject } from 'rxjs';
import type { VComponent } from 'src/component';
import { reactive } from '../reactive';

type RouterConfig = Array<{ path: string; component: () => VComponent }>;

export class Router {
  constructor(
    // private container: Container,
    private config: RouterConfig // private renderFn: (component: Component, parent: Container) => any
  ) {}

  public readonly route = reactive<Location>(window.location);

  getCurrentUrl() {
    return this.route.value;
  }

  private _initialized = false;
  init() {
    if (this._initialized) return;

    this._initialized = true;
    window.addEventListener('popstate', () => {
      console.log('popstate');
      console.log({ location: window.location.pathname });
      // NB: this is necessary to make sure the new route is a different object
      // and the emission is not blocked by distinctUntilChanged in switch
      this.route.update({
        ...window.location,
      });
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

  navigate(url: string) {
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

  build() {
    return new Router(this.config);
  }
}

export const routerBuilder = () => new RouterBuilder();
