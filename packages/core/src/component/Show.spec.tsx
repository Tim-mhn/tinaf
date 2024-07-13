// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { describe, expect, it, vi } from "vitest";
// import { buildMockParent } from "../test-utils/dom-element.mock";
// import { render } from "../render";
// import { component } from './v-component';
// import type { VComponent } from "./component";
// import { bool } from "../reactive";
// import { Show } from "./Show";


// // function setup({ list }: { list: ReturnType<typeof reactiveList<string>> }) {
// //   const renderFn = vi.fn((item: string) => item);

  

// //   const mockParent = buildMockParent();

// //   let cmp!: ReturnType<typeof TestComponent>;

// //   const mount = () => {
// //     cmp = TestComponent({});

// //     render(cmp, mockParent.html);
// //   };

// //   const hasChildren = (children: any[]) => {
// //     expect(cmp.parent.html.childNodes).toEqual(children);
// //   };

// //   const shouldHaveRenderedNChildren = (n: number) => {
// //     expect(renderFn).toHaveBeenCalledTimes(n);
// //   };

// //   return { shouldHaveRenderedNChildren, mount, hasChildren };
// // }

// function mountComponent(component: VComponent) {
//   const mockParent = buildMockParent();

//     render(component, mockParent.html)


//     const hasChildren = (children: any[]) => {
//       expect(component.parent.html.childNodes).toEqual(children);
//     };

//     return { hasChildren }
  
// }


// describe('<Show />', () => {

//   it('renders the right child initially', () => {


//     const Card = component(({ children}) => {
//       return <div>children</div>
//     })

//     const TestComponent  = component(() => {
//       const [condition, toggle ] = bool(true);

//       return <Show when={condition}>
//         <Card > a</Card>
//       </Show> 
//     })


//     const { hasChildren } = mountComponent(<TestComponent />)

//     hasChildren(['a'])


//   })
// })