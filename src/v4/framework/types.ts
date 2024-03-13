import { MaybeReactive } from './reactive/types';

export type Component = MaybeReactive<string | number> | (() => HTMLElement);
