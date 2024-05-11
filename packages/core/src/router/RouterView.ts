import { div } from '../dom';
import { component } from '../component';
import { injectApp } from '../common';
import { ROUTER_PROVIDER_KEY } from './provider.key';
import type { Router } from './router';
import { map } from 'rxjs';

function buildPlaceholderComment() {
  const commentText = ` <RouterView /> `;
  const comment = document.createComment(commentText);
  return comment;
}
export const RouterView = component(() => {
  console.group('RouterView');
  const tinafApp = injectApp();

  const router = tinafApp.get<Router>(ROUTER_PROVIDER_KEY);

  router.init();

  const component = router.route$.pipe(
    map((route) => {
      const pathComponent = router.getComponentForPath(route.pathname);
      return pathComponent ? pathComponent() : buildPlaceholderComment();
    })
  );

  const url = router.getCurrentUrl();

  const pathComponent = router.getComponentForPath(url.pathname);

  console.log({ tinafApp });
  console.log({ router });
  console.log({ url });

  const pathname = url.pathname;
  console.log({ pathname });
  console.groupEnd();

  // TODO: need to be able to have a "Reactive" component .
  // need to see how we handle that
  return div(
    'TODO: Find a solution to handle the reactive component in Router View'
  );
});
