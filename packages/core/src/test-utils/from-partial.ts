export function fromPartial<T>(partial: Partial<T>): T {
  return partial as T;
}
