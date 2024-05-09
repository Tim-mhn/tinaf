import { component } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { SearchBar } from './SearchBar';
import type { Product } from 'src/models/product';

const HeaderTitle = div(
  div('Marketplace ').addClass('text-2xl font-semibold'),
  div('by Tinaf').addClass('pt-1 text-slate-600')
).addClass('flex items-center gap-3');

export const Header = component<{
  updateProducts: (products: Product[]) => void;
}>(({ updateProducts }) => {
  return div(HeaderTitle, SearchBar({ updateProducts })).addClass(
    'flex  items-center gap-32 border-b border-b-primary p-6 h-20'
  );
});
