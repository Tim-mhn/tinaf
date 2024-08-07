import type { VComponent } from '../component';
import { render } from '../render';
import { buildMockParent } from './dom-element.mock';

// eslint-disable-next-line @typescript-eslint/ban-types
export const fakeMount = (component: (props: {}) => VComponent) => {
  const cmp = component({});

  const mockParent = buildMockParent();

  render(cmp, mockParent.html);

  return {
    cmp,
    children: cmp.parent.html.childNodes,
  };
};
