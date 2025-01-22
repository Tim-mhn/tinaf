import { component, Match, Switch } from 'tinaf/component';
import { DocPageLayout } from '../../layouts';
import { Radio, RadioGroup } from '../../components';
import { reactive } from 'tinaf/reactive';

export const QuickStartPage = component(() => {
  const packageManager = reactive<'npm' | 'yarn'>('npm');

  const Code = component(() => {
    return (
      <Switch condition={packageManager}>
        <Match when="npm">
          <code> npx create tinaf</code>
        </Match>

        <Match when="yarn">
          <code>yarn create-tinaf</code>
        </Match>
      </Switch>
    );
  });
  return (
    <DocPageLayout title="Quick start">
      <p>Use the Vite starter command</p>

      <RadioGroup model={packageManager}>
        <Radio value="npm" activeClass="bg-slate-700">
          npm
        </Radio>
        <Radio value="yarn" activeClass="bg-slate-700">
          yarn
        </Radio>
      </RadioGroup>

      <Code />
    </DocPageLayout>
  );
});
