import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, HighlightedText, InlineCode, TsxCode } from '../../components';

export const ConditionalRenderingPage = component(() => {
  return (
    <DocPageLayout title="Conditional Rendering">
      <p>
        <HighlightedText>Conditional rendering</HighlightedText> is the ability
        to render different pieces of elements based on some conditions. This
        corresponds to Vue's <InlineCode>v-if/v-else</InlineCode>, React's{' '}
        <InlineCode>if/else</InlineCode> or Angular's{' '}
        <InlineCode>*ngIf/ngElse</InlineCode>
      </p>

      <p>
        To achieve this in Tinaf, you can use the{' '}
        <InlineCode>{`<Show />`}</InlineCode>
        or the <InlineCode>{`<Switch />`}</InlineCode> components, depending on
        your use case. Again, this was heavily inspired by{' '}
        <HighlightedText>Solid</HighlightedText>
      </p>

      <p>
        If you need to show a component under a condition, use{' '}
        <InlineCode>{`<Show />`}</InlineCode>
      </p>

      <TsxCode
        code={`const Cmp = component(() => {
  const [show, toggle] = bool(true);
  
  return <div>
    <Show when={show}>
      <div> this is shown when "show" is true </div>
    </Show>

    <button onClick={toggle}> click to toggle </button>
  </div>
})`}
      />

      <p>
        You can also pass a fallback, which is shown when the condition is false
      </p>

      <TsxCode
        code={`const Cmp = component(() => {
  const [show, toggle] = bool(true);
  
  return <div>
    <Show when={show} fallback={<span> this is a fallback </span>}>
      <div> this is shown when "show" is true </div>
    </Show>

    <button onClick={toggle}> click to toggle </button>
  </div>
})`}
      />

      <p>
        If you want to do a mapping between values and components, use the{' '}
        <InlineCode>{`<Switch />`}</InlineCode> component
      </p>

      <TsxCode
        code={`import { Switch, component } from "tinaf/component"

const Cmp = component(() => {

  const condition = reactive<"a" | "b" | "c">("a");
  
  return <Switch condition={condition}>

    <Match when="a">
      <div> a </div>
    </Match>
    
    <Match when="b">
        <div> b </div>
    </Match>
    
    <Match when="c">
        <div> c </div>
    </Match>
    
  </Switch>
})`}
      />

      <Button className="w-full md:w-fit m-auto" size="md" href="/docs/styling">
        Learn about styling
      </Button>
    </DocPageLayout>
  );
});
