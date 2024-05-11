import { expect, describe, it, vi } from 'vitest';

describe.skip('Router', () => {
  it('navigates to the right component for the right path', () => {
    const HomeComponent = {
      init: vi.fn(),
      destroy: vi.fn(),
    };

    const DashboardComponent = {
      init: vi.fn(),
      destroy: vi.fn(),
    };

    const renderFn = vi.fn();

    const container = 'MOCK_CONTAINER';

    const router = routerBuilder()
      .withConfig([
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
      ])
      .withContainer(container)
      .withRenderFn(renderFn)
      .build();

    router.navigate('home');

    expect(renderFn).toHaveBeenCalledWith(HomeComponent, expect.anything());

    router.navigate('dashboard');

    expect(HomeComponent.destroy).toHaveBeenCalled();
    expect(renderFn).toHaveBeenCalledWith(
      DashboardComponent,
      expect.anything()
    );
  });
});
