export const flushPromises = () =>
  new Promise<void>((resolve) => setTimeout(() => resolve()));
