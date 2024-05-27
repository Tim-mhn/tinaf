import type { VComponent } from '../component';
import { Reactive, reactive } from '../reactive';
import type { Maybe } from '../utils/types';

export type RouterConfig = Array<{
  path: string;
  component: () => VComponent;
  children?: RouterConfig;
}>;

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
    private readonly config: RouterConfig,
    private readonly _routeChangerHandler: RouteChangeHandler,
    protected _currentLocation: CurrentLocation,
    private readonly _history: History = history
  ) {
    this.route = reactive<RouterLocation>(
      this._buildRouterLocation(this._currentLocation.location.pathname)
    );
  }

  public readonly route: Reactive<RouterLocation>;

  getCurrentUrl() {
    return this.route.value;
  }

  private _initialized = false;

  private _buildRouterLocation(currentPath: string) {
    const fullPathPattern = this._findFullPathPattern(currentPath);

    const params = this._findDynamicParams(fullPathPattern || '', currentPath);
    return {
      path: currentPath,
      params,
    };
  }

  private _findFullPathPattern(currentPath: string) {
    let fullPathPattern = '';

    let routes = this.config;
    let path = currentPath;
    while (path && routes.length > 0) {
      const { match, matchingPath, route } = buildMatchingRoute(routes, path);

      if (!match) return fullPathPattern;

      fullPathPattern += route.path;
      path = path.replace(matchingPath, '');
      routes = route.children || [];
    }

    return fullPathPattern;
  }

  private resetDepth?: () => void;
  init(resetDepth?: () => void) {
    this.resetDepth = resetDepth;
    if (this._initialized) return;

    console.count('router init');

    this._initialized = true;

    this._routeChangerHandler.onRouteChange(() => {
      const path = this._currentLocation.location.pathname;

      const newLocation = this._buildRouterLocation(path);
      this.route.update(newLocation);
    });
  }

  getComponentForPath(path: string, { depth = 0 } = {}) {
    let _path = path;
    let routes: RouterConfig = this.config;
    let currentDepth = 0;

    let component: Maybe<() => VComponent> = null;
    while (currentDepth <= depth) {
      const { route, match, matchingPath } = buildMatchingRoute(routes, _path);

      if (!match) {
        console.warn(
          `[TINAF] No matching route found for path ${path} and depth ${depth}`
        );
        return component;
      }

      _path = _path.replace(matchingPath, '');
      component = route.component;

      routes = route.children || [];
      currentDepth += 1;
    }

    return component;
  }

  navigate(url: string) {
    // this.resetDepth?.();
    const UNUSED_PARAM = '';
    this._history.pushState({}, UNUSED_PARAM, url);
    this._routeChangerHandler.publishRouteChange();
  }

  private _findDynamicParams(pattern: string, route: string) {
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

  getMatchingRoute({ path, depth }: { path: string; depth: number }) {
    let routes = this.config;
    let currentDepth = 0;

    let _path = path;

    let _route: RouterConfig[number] | null = null;

    while (currentDepth <= depth) {
      const { route, match, matchingPath } = buildMatchingRoute(routes, _path);

      if (!match) {
        console.warn(
          `[TINAF] No matching route found for path ${_path} and depth ${depth}`
        );
        return route;
      }

      _path = _path.replace(matchingPath, '');

      routes = route.children || [];
      _route = route;
      currentDepth += 1;
    }

    return _route;
  }
}

function buildMatchingRoute(
  routes: RouterConfig,
  urlPath: string
):
  | {
      match: false;
      route: null;
      matchingPath: '';
    }
  | { route: RouterConfig[number]; matchingPath: string; match: true } {
  for (let route of routes) {
    const regexString = route.path
      .split('/')
      .map((path) => {
        if (path.startsWith(':')) return '([^/]+)';
        return path;
      })
      .join('/');

    const regexp = new RegExp(`^${regexString}`);

    const match = urlPath.match(regexp);

    if (match) return { route, matchingPath: match[0], match: true };
  }

  return { match: false, matchingPath: '', route: null };
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
