import { Input } from '../../shared/Input';
import { component } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
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

  return div(
    div(title).addClass('text-md font-semibold'),
    div(description).addClass('text-sm')
  ).addClass({
    'border rounded-md shadow-md p-4  gap-2 flex flex-col w-[240px]': true,
    'bg-white border-slate-800 text-slate-800': isLight,
    'bg-slate-800 text-white': isDark,
  });
});

export const DynamicCard = component(() => {
  const title = inputReactive('Title');
  const description = inputReactive('Description');

  const theme = reactive<'light' | 'dark'>('light');

  const toggleTheme = () =>
    theme.update(theme.value === 'light' ? 'dark' : 'light');

  return div(
    div(
      Input(title, { placeholder: `Change the card's title` }),
      Input(description, { placeholder: `Change the card's description` }),
      button('Toggle theme')
        .on({ click: toggleTheme })
        .addClass(
          'border bg-slate-600 p-2 rounded-sm hover:bg-slate-800 text-white text-sm'
        )
    ).addClass('flex flex-col gap-4'),
    Card({ title, description, theme })
  ).addClass('flex flex-row gap-16');
});
