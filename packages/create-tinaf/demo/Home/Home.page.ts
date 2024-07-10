import { component } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { Counter } from './components/Counter';
import { InputExample } from './components/InputExample';
import { DynamicCard } from './components/Card';
import { Hr } from '../shared/Hr';

export const HomePage = component(() => {
  return (
    <div className="flex flex-col gap-16">
      <Counter />
      <Hr />
      <InputExample />
      <Hr />
      <DynamicCard />
    </div>
  );
});
