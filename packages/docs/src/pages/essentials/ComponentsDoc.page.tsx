import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import {
  Button,
  HighlightedText,
  InlineCode,
  Link,
  TsxCode,
} from '../../components';

export const ComponentsDocPage = component(() => {
  return (
    <DocPageLayout title="Components">
      <h3 className="text-2xl">Creating a component</h3>

      <p>
        To create a component, we use the
        <InlineCode>component</InlineCode>
        function.
      </p>

      <p>
        To start, it can accept a simple function that returns a div element
      </p>

      <TsxCode
        code={`// MyComponent.tsx
import { component } from "tinaf/component"

export const MyComponent = component(() => {
  return <div> hello world </div>
})  
`}
      />

      <p>
        Similarly to other JSX libraries, you can use your components in a
        HTML-like syntax
      </p>

      <TsxCode
        code={`import { component } from "tinaf/component"

export const Parent = component(() => {
  return <MyComponent />
})  
`}
      />

      <p>
        A component can accept <HighlightedText>props</HighlightedText> . To do
        that, type the <InlineCode>component</InlineCode> function with the
        props type
      </p>

      <p>
        Each prop is a possible{' '}
        <HighlightedText>reactive value</HighlightedText>. Check out the section
        on{' '}
        <Link href="/docs/reactivity" color="green">
          reactivity
        </Link>{' '}
        to see how that works
      </p>

      <TsxCode
        code={`// MyComponent.tsx
       
const MyComponent = component<{ text: string}>(( { text }) => {
  return <div> { text } </div>
})
      
const Parent = component(() => {
    return <Child text="hello there" />
})
      `}
      />

      <p>
        A component can also accept&nbsp;
        <HighlightedText>children</HighlightedText>. This works similarly to
        React.
      </p>

      <TsxCode
        code={`// MyComponent.tsx
import { component } from "tinaf/component"

const MyComponent = component(( { children = [] }) => {
    return <div> { ...children } </div>
})

const Parent = component(() => {
    return  <Child> <div> this is passed inside the child </div> </Child>
})`}
      />

      <Button
        className="w-full md:w-fit m-auto"
        size="md"
        href="/docs/reactivity"
      >
        Learn about reactivity
      </Button>
    </DocPageLayout>
  );
});
