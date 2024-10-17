export type MaybeArray<T> = T | T[];

export function toArray<T>(maybeArr: T | T[]): T[] {
  if (maybeArr === undefined) return [];

  return Array.isArray(maybeArr) ? maybeArr : [maybeArr];
}

export function maybeArrayForEach<T>(
  maybeArr: MaybeArray<T>,
  callbackFn: Parameters<Array<T>['forEach']>[0]
) {
  toArray(maybeArr).forEach(callbackFn);
}
