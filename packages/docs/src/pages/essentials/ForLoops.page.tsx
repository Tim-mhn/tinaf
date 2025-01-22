import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, Code, InlineCode } from '../../components';

export const ForLoopsPage = component(() => {
  return (
    <DocPageLayout title="For loops">
      <p>
        If you need to render a list of components, you'll need the{' '}
        <InlineCode>{`<For />`}</InlineCode> component. It's similar to Solid's
        component of the same name!
      </p>

      <Code>
        // ShoppingList.tsx
        <br />
        {`import { For } from "tinaf/component"`}
        <br />
        <br />
        {`type ShoppingItem = { label: string; quantity: number }`}
        <br />
        <br />
        {` 

        
        
        const ShoppingList = component(() => {
           const items = reactiveList<ShoppingItem>([{ label: "banana", quantity: 10 }, { label: "cereals", quantity: 1} ,  { label: "eggs", quantity: 12 }])


           `}
        <br />
        <br />
        {` return <For each={items} keyFunction{(i) => i.label}> `}
        <br />
        {`
                { (item: ShoppingItem) => <div> 
                 {{ item.quantity}} - {{ item.label}}
                </div>
                }
           </For>`}
        <br />
        {`})

        `}
      </Code>

      <p>
        Note that we pass the list of items to the <InlineCode>each</InlineCode>{' '}
        property.{' '}
      </p>

      <p>
        The <InlineCode>keyFunction</InlineCode> is used to differentiate items
        when the list is updated and avoid unnecessary re-rendering. This is
        equivalent to Vue/React's <InlineCode>key</InlineCode> or Angular{' '}
        <InlineCode>keyFor</InlineCode>
      </p>

      <p>
        To achieve this in Tinaf, you can use the{' '}
        <InlineCode>{`<Show />`}</InlineCode>
        or the <InlineCode>{`<When />`}</InlineCode> components, depending on
        your use case
      </p>

      <Button
        className="w-full md:w-fit m-auto"
        size="md"
        href="/docs/conditional-rendering"
      >
        Learn about conditional rendering
      </Button>
    </DocPageLayout>
  );
});
