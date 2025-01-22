import { component } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Button, Code, Divider, Radio, RadioGroup } from '../../components';
import { reactive, xequal, xif } from 'tinaf/reactive';

export const QuickStartPage = component(() => {
  const packageManager = reactive<'npm' | 'yarn'>('npm');

  const StarterCode = component(() => {
    const starterCode = xif(xequal(packageManager, 'npm'))
      .xthen('npx create tinaf')
      .xelse('yarn create-tinaf');

    return <Code copyCode={starterCode}> {starterCode} </Code>;
  });

  const DevServerCode = component(() => {
    const startDevServer = xif(xequal(packageManager, 'npm'))
      .xthen('npm run dev')
      .xelse('yarn dev');

    return <Code copyCode={startDevServer}>{startDevServer}</Code>;
  });
  return (
    <DocPageLayout title="Quick start">
      <h3 className="text-2xl">Use the Vite starter command</h3>

      <RadioGroup model={packageManager}>
        <Radio value="npm" activeClass="bg-slate-700">
          npm
        </Radio>
        <Radio value="yarn" activeClass="bg-slate-700">
          yarn
        </Radio>
      </RadioGroup>

      <p>Create the scaffolding project</p>
      <StarterCode />

      <p>Start the dev server</p>

      <DevServerCode />

      <p>And visit http://localhost:5173</p>

      <Divider />

      <p>Here is what your entry file (main.ts) should look like</p>

      <Code>
        {"import { createApp } from 'tinaf/render';"}
        <br />
        {"import { ROUTER_PROVIDER_KEY, createRouter } from 'tinaf/router';"}
        <br />
        {"import { HomePage } from './src/Home/Home.page';"}
        <br />

        {"import { TodoListPage } from './src/Todos/TodoList.page';"}
        <br />

        {"import { App } from './src/App';"}
        <br />

        {`const router = createRouter([
            {
              path: '/todos',
              component: TodoListPage,
            },
            {
              path: '/',
              component: HomePage,
            },
          ]);`}
        <br />

        {'const app = createApp(App).provide(ROUTER_PROVIDER_KEY, router);'}
        <br />

        {"app.render('container');"}
      </Code>

      <Button
        className="w-full md:w-fit m-auto"
        size="md"
        href="/docs/components"
      >
        Create your first component
      </Button>
    </DocPageLayout>
  );
});
