const onDestroyCallbacksStack: (() => void)[] = [];
export const onDestroy = (callback: () => void) => {
  onDestroyCallbacksStack.push(callback);
};

export const popLastOnDestroyCallback = () => onDestroyCallbacksStack.pop();

type MaybePromise<T> = T | Promise<T>;
const onInitCallbacksStack: (() => MaybePromise<void>)[] = [];

export const onInit = (callback: () => void) => {
  onInitCallbacksStack.push(callback);
};

export const popLastOnInitCallback = () => onInitCallbacksStack.pop();
