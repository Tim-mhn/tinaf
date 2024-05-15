import type { VComponent } from 'src/component';
import { Reactive, reactive } from '../reactive';

export type RouterConfig = Array<{ path: string; component: () => VComponent }>;

type RouterConfigWithRegex = Array<RouterConfig[number] & { regex: RegExp }>;

const buildRegexString = (pattern: string) =>
  pattern
    .split('/')
    .map((path) => {
      if (path.startsWith(':')) return '(.*)';
      return path;
    })
    .join('/');

function findDynamicParams(pattern: string, route: string) {
  const patternParts = pattern.split('/');
  const routeParts = route.split('/');

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const routePart = routeParts[i];

    if (patternPart.startsWith(':')) {
      const key = patternPart.slice(1);
      params[key] = routePart;
    }
  }

  return params;
}

export interface RouteChangeHandler {
  publishRouteChange(): void;
  onRouteChange(callback: () => void): void;
}

export interface CurrentLocation {
  location: Location;
}

export type RouterLocation = {
  path: string;
  params: Record<string, string>;
};

export class Router {
  constructor(
    config: RouterConfig,
    private _routeChangerHandler: RouteChangeHandler,
    private _currentLocation: CurrentLocation,
    private _history: History = history
  ) {
    this.config = config.map((route) => ({
      ...route,
      regex: new RegExp(`^${buildRegexString(route.path)}$`),
    }));
    this.route = reactive<RouterLocation>(
      this._buildRouterLocation(this._currentLocation.location.pathname)
    );
  }

  config: RouterConfigWithRegex;

  public readonly route: Reactive<RouterLocation>;

  getCurrentUrl() {
    return this.route.value;
  }

  private _initialized = false;

  private _buildRouterLocation(currentPath: string) {
    const matchingConfigRoute = this.config.find((route) =>
      currentPath.match(route.regex)
    );

    const params = findDynamicParams(
      matchingConfigRoute?.path || '',
      currentPath
    );
    return {
      path: currentPath,
      params,
    };
  }
  init() {
    if (this._initialized) return;

    this._initialized = true;

    this._routeChangerHandler.onRouteChange(() => {
      const path = this._currentLocation.location.pathname;

      const newLocation = this._buildRouterLocation(path);
      this.route.update(newLocation);
    });
  }

  getComponentForPath(path: string) {
    const route = this.config.find((route) => path.match(route.regex));
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
    this._history.pushState({}, UNUSED_PARAM, url);
    this._routeChangerHandler.publishRouteChange();
  }
}

class RouterBuilder {
  config: RouterConfig = [];

  withConfig(config: RouterConfig) {
    this.config = config;
    return this;
  }

  build() {
    return createRouter(this.config);
  }
}

/**
 * @deprecated use createRouter instead
 * @returns
 */
export const routerBuilder = () => new RouterBuilder();

export const createRouter = (config: RouterConfig) => {
  const windowRouteChangeHandler: RouteChangeHandler = {
    onRouteChange: (callback) => window.addEventListener('popstate', callback),
    publishRouteChange: () =>
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} })),
  };

  const windowCurrentLocation: CurrentLocation = window;

  return new Router(
    config,
    windowRouteChangeHandler,
    windowCurrentLocation,
    history
  );
};
