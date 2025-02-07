import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, InlineCode, TsxCode } from '../../components';

export const ForLoopsPage = component(() => {
  return (
    <DocPageLayout title="For loops">
      <p>
        If you need to render a list of components, you'll need the{' '}
        <InlineCode>{`<For />`}</InlineCode> component. It's similar to Solid's
        component of the same name!
      </p>

      <TsxCode
        code={`// ShoppingList.tsx
import { For, component } from "tinaf/component"

type ShoppingItem = { label: string; quantity: number };

const ShoppingList = component(() => {
  const items = reactiveList<ShoppingItem>([
    { label:  "banana", quantity: 10 }, 
    { label: "cereals", quantity: 2 }, 
    { label: "eggs", quantity: 12 }
  ])
   
  return <For each={items} keyFunction={(i) => i.label}>
    { (item: ShoppingItem) => 
      <div> { item.quantity} x { item.label }} </div>
    }
  </For>
`}
      />

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
