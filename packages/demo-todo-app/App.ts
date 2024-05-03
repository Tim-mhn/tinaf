import { component, type VComponent } from '@tinaf/core/component';
import { div } from '@tinaf/core/dom';

export const App: () => VComponent = component(() => {
  return div('Hello World!');
});
