import { component } from 'tinaf/component';
import { div } from 'tinaf/dom';
import { injectRouter } from 'tinaf/router';

export const Links = component(() => {
  const router = injectRouter();

  return div(
    div('Home')
      .on({ click: () => router.navigate('/') })
      .addClass('cursor-pointer underline'),
    div('Todo List')
      .on({ click: () => router.navigate('/todos') })
      .addClass('cursor-pointer underline')
  ).addClass(
    'flex gap-4 p-8 h-[140px] items-center  border-t border-slate-800'
  );
});
