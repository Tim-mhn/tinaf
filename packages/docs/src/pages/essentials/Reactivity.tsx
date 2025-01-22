import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, Code, HighlightedText, InlineCode } from '../../components';

export const ReactivityPage = component(() => {
  return (
    <DocPageLayout title="Reactivity">
      <p>
        The reactivity system is a
        <HighlightedText> fine-grained</HighlightedText> reactivity system,
        based on the RxJS library. This means that if a reactive value gets
        updated, only the affected parts of the <i>Virtual DOM</i> are affected
        and only the relevant parts in the <i>DOM</i> are updated.
      </p>
      <p>
        To create a reactive value, use the <InlineCode>reactive</InlineCode>{' '}
        function{' '}
      </p>
      <Code>const user = reactive("bob")</Code>
      <p>
        To access its current value, use <InlineCode>.value</InlineCode>
      </p>
      <Code>
        const user = reactive("bob")
        <br /> console.log(user.value); // "bob"
      </Code>
      <p>
        You can <HighlightedText>derive</HighlightedText> reactive values from
        another reactive value using the <InlineCode>computed</InlineCode>
        function.{' '}
      </p>
      <Code>
        const age = reactive(20)
        <br /> {`const isAdult = computed(() => age.value >= 18 )`}
      </Code>
      <p>
        Note that the values are never computed initially, only when they are
        needed in the DOM
      </p>
      <p>
        To <HighlightedText>update</HighlightedText> a reactive, use the{' '}
        <InlineCode>.update</InlineCode> method. Not this is not available for{' '}
        <InlineCode>computed</InlineCode> values as these are{' '}
        <HighlightedText>read-only</HighlightedText>
      </p>
      <Code>
        {`const mode = reactive<"light" | "dark">("dark")`}
        <br />
        mode.update("light")
      </Code>
      <p>
        If you need to run a side-effect whenever one or multiple reactive
        values changes, you can use the <InlineCode>effect</InlineCode>function.
        In the second argument, you pass it the list of reactives it needs to
        watch
      </p>

      <Code>
        {`const mode = reactive<"light" | "dark">("dark")`}
        <br />
        {`effect(() => { console.log("mode was changed !"); }, [mode])`}
      </Code>

      <p>Finally, some helper functions exist for booleans and lists</p>

      <Code>
        {`const [isOpen, toggle] = bool(false)`}
        <br />
        {`isOpen.value; // false`}
        <br />
        {`toggle(); `}
        <br />
        {`isOpen.value; // true`}
        <br />
      </Code>

      <Code>
        {`const fruits = reactiveList(["banana", "apple"])`}
        <br />
        {`fruits.value; // ["banana", "apple"]`}
        <br />
        {`fruits.add("kiwi"); `}
        <br />
        {`fruits.value; // ["banana", "apple", "kiwi"]`}
        <br />
      </Code>

      <Button
        className="w-full md:w-fit m-auto"
        size="md"
        href="/docs/for-loops"
      >
        Check out for-loop components
      </Button>
    </DocPageLayout>
  );
});
