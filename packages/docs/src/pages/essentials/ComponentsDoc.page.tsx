import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import {
  Button,
  Code,
  HighlightedText,
  InlineCode,
  Link,
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

      <Code>
        {`// MyComponent.tsx`}
        <br />

        {`export const MyComponent = component(() => {
            return <div> hello world </div>
        })

        
`}
      </Code>

      <p>
        Similarly to other JSX libraries, you can use your components in a
        HTML-like syntax
      </p>
      <Code>
        {`export const Parent = component(() => {
    return <div> <MyComponent /> </div>
    })`}
      </Code>

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

      <Code>
        {`// MyComponent.tsx`}
        <br />
        <br />

        {` const MyComponent = component<{ text: string }>(({ text}) => {
            return  <div> { text } </div>
        })`}

        <br />
        <br />

        {` const Parent = component(() => {
            return  <Child text="hello there" />
        })`}
      </Code>

      <p>
        A component can also accept&nbsp;
        <HighlightedText>children</HighlightedText>. This works similarly to
        React.
      </p>

      <Code>
        {`// MyComponent.tsx`}
        <br />
        <br />

        {` const MyComponent = component(({ children = []}) => {
            return  <div> { ...children } </div>
        })`}

        <br />
        <br />

        {` const Parent = component(() => {
            return  <Child> <div> this is passed inside the child </div> </Child>
        })`}
      </Code>

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
