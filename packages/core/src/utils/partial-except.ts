export type PartialExcept<
  T extends object,
  RequiredKey
> = RequiredKey extends keyof T
  ? Partial<Omit<T, RequiredKey>> & Pick<T, RequiredKey>
  : Partial<T>;
