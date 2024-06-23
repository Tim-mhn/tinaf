import { onDestroy, onInit } from '../component';

export const useTimeout = (fn: () => void, delayMs: number) => {
  let timeoutRef: ReturnType<typeof setTimeout> | null = null;

  onInit(() => {
    timeoutRef = setTimeout(fn, delayMs);
  });

  onDestroy(() => {
    if (timeoutRef) clearTimeout(timeoutRef);
  });
};
