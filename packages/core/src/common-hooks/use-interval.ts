import { onDestroy, onInit } from '../component';

export const useInterval = (callback: () => void, intervalMs: number) => {
  let intervalRef: ReturnType<typeof setInterval> | null = null;

  onInit(() => {
    intervalRef = setInterval(callback, intervalMs);
  });

  onDestroy(() => {
    if (intervalRef) clearInterval(intervalRef);
  });
};
