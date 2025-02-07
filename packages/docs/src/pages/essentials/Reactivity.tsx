import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, HighlightedText, InlineCode, TsxCode } from '../../components';

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

      <TsxCode
        code={`import { reactive } from "tinaf/reactive"

const user = reactive("bob");
`}
      />

      <p>
        To access its current value, use <InlineCode>.value</InlineCode>
      </p>

      <TsxCode
        code={`const user = reactive("bob");
console.log(user.value); // "bob"`}
      />

      <p>
        You can <HighlightedText>derive</HighlightedText> reactive values from
        another reactive value using the <InlineCode>computed</InlineCode>
        function.{' '}
      </p>

      <TsxCode
        code={`import { reactive, computed } from "tinaf/reactive" 

const age = reactive(20);
const isAdult = computed(() => age.value >= 18);
`}
      />
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

      <TsxCode
        code={`const mode = reactive<"light" | "dark">("dark");
mode.update("light")`}
      />

      <p>
        If you need to run a side-effect whenever one or multiple reactive
        values changes, you can use the <InlineCode>effect</InlineCode>function.
        In the second argument, you pass it the list of reactives it needs to
        watch
      </p>

      <TsxCode
        code={`import { reactive, effect } from "tinaf/reactive"

const mode = reactive<"light" | "dark">("dark");

effect(() => {
  console.log("mode was changed !");
}, [mode])`}
      />

      <p>Finally, some helper functions exist for booleans and lists</p>

      <TsxCode
        code={`import { bool } from "tinaf/reactive";

const [isOpen, toggle] = bool(false);
isOpen.value; // false

toggle();
isOpen.value; // true `}
      />

      <TsxCode
        code={`import { reactiveList } from "tinaf/reactive";

const fruits = reactiveList(["banana, apple"]);

fruits.value; // ["banana", "apple"]
fruits.add("kiwi");

fruits.value; // ["banana", "apple", "kiwi"]`}
      />

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
