import { Input } from '../../shared/Input';
import { component } from 'tinaf/component';
import {
  computed,
  inputReactive,
  not,
  reactive,
  toValue,
} from 'tinaf/reactive';

type CardProps = {
  title: string;
  description: string;
  theme: 'light' | 'dark';
};
const Card = component<CardProps>(({ title, description, theme }) => {
  const isLight = computed(() => toValue(theme) === 'light');
  const isDark = not(isLight);

  return <div className={
    {
      'border rounded-md shadow-md p-4  gap-2 flex flex-col w-[240px]': true,
    'bg-white border-slate-800 text-slate-800': isLight,
    'bg-slate-800 text-white': isDark,
    }
  }>
    <div className="text-md font-semibold">{ title }</div>
    <div className="text-sm">{ description}</div>

  </div>
});

export const DynamicCard = component(() => {
  const title = inputReactive('Title');
  const description = inputReactive('Description');

  const theme = reactive<'light' | 'dark'>('light');

  const toggleTheme = () =>
    theme.update(theme.value === 'light' ? 'dark' : 'light');

  return <div className="flex flex-row gap-16">
    <div className="flex flex-col gap-4">
      <Input reactiveText={title} placeholder="Change the card's title" />

      <Input reactiveText={description} placeholder="Change the card's description" />

      <button onClick={toggleTheme} className="border bg-slate-600 p-2 rounded-sm hover:bg-slate-800 text-white text-sm">Toggle theme</button>
      </div>
    <Card  title={title} description={description}  theme={theme} /> 
    </div>

});
