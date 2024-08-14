const path = '/product/:productId';

const regexString = path
  .split('/')
  .map((path) => {
    if (path.startsWith(':')) return '([^/]+)';
    return path;
  })
  .join('/');

function findRouteMatch(urlPath: string) {
  const regexp = new RegExp(`^${regexString}`);
  const match = urlPath.match(regexp);

  if (!match) {
    return;
  }
}

findRouteMatch('/product/12345/details');
findRouteMatch('/caeea/ceaceac');
