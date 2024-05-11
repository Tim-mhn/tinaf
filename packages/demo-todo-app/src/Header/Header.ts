import { component } from 'tinaf/component';
import { button, div } from 'tinaf/dom';
import { SearchBar } from './SearchBar';
import type { Product } from 'src/models/product';
import { injectRouter } from 'tinaf/router';

const HeaderTitle = component(() => {
  const router = injectRouter();

  return div(
    button('Marketplace ')
      .addClass('text-2xl font-semibold')
      .on({
        click: () => router.navigate('/'),
      }),
    div('by Tinaf').addClass('pt-1 text-slate-600')
  ).addClass('flex items-center gap-3');
});

export const Header = component(() => {
  return div(HeaderTitle()).addClass(
    'flex  items-center gap-32 border-b border-b-primary p-6 h-20'
  );
});
