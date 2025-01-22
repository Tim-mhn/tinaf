import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, Code, HighlightedText, InlineCode } from '../../components';

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

      <Code>
        {`const Cmp = component(() => {`}
        <br />

        {`const  [show, toggle] = bool(true)`}
        <br />

        {`return <div> 
            <Show when={show} >
                <div> this is shown when "show" is true
        </Show>

        <button onClick={toggle} > toggle </button>

        </div>`}
      </Code>

      <p>
        You can also pass a fallback, which is shown when the condition is false
      </p>

      <Code>
        {`const Cmp = component(() => {`}
        <br />

        {`const  [show, toggle] = bool(true)`}
        <br />

        {`return <div> 
            <Show when={show} fallback={<span>this is a fallback </span>} >
                <div> this is shown when "show" is true
        </Show>

        <button onClick={toggle} > toggle </button>

        </div>`}
      </Code>

      <p>
        If you want to do a mapping between values and components, use the{' '}
        <InlineCode>{`<Switch />`}</InlineCode> component
      </p>

      <Code>
        {`
          
const Cmp = component(() => { `}
        <br />
        {`const condition = reactive<"a" | "b" | "c">("a")`}
        <br /> <br />
        {`return   <Switch condition={condition}>`}
        <br />
        {`<Match when="a">`}
        <br />
        {`  <div>a</div>`}
        <br />
        {` </Match>`}
        <br />
        {` <Match when="b">`}
        <br />
        {`  <div>b</div>`}
        <br />
        {` </Match>`}
        <br />
        {` <Match when="c">`}
        <br />
        {`   <div>c</div>`}
        <br />
        {`  </Match>`}
        <br />
        {` </Switch>`}
        <br />
        {`  })`}
      </Code>

      <Button className="w-full md:w-fit m-auto" size="md" href="/docs/styling">
        Learn about styling
      </Button>
    </DocPageLayout>
  );
});
