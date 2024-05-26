import { fromPartial } from 'src/test-utils/from-partial';
import {
  Router,
  type CurrentLocation,
  type RouteChangeHandler,
  type RouterConfig,
} from './router';
import { vi } from 'vitest';
import { from } from 'rxjs';
export class MockRouteChangeHandler implements RouteChangeHandler {
  private callback: () => void = () => undefined;

  onRouteChange(callback: () => void) {
    this.callback = callback;
  }
  publishRouteChange() {
    if (this.callback) this.callback();
  }
}

export const buildMockHistory = () =>
  fromPartial<History>({
    pushState: vi.fn(),
  });

export const buildTestRouter = (
  config: RouterConfig,
  { initialPath = '/' } = {}
) => {
  return new TestRouter(config, initialPath);
};

export class TestRouter extends Router {
  constructor(config: RouterConfig, initialPath: string) {
    const location: CurrentLocation = {
      location: fromPartial<Location>({
        pathname: initialPath,
      }),
    };

    super(config, new MockRouteChangeHandler(), location, buildMockHistory());
  }

  navigate(url: string): void {
    // this is a hack to make the route changes happen in the tests
    // FIXME: do better than this
    this._currentLocation.location.pathname = url;
    super.navigate(url);
  }
}
