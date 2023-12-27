import { Reactive } from './reactive';

export type Component = DynamicComponent | DomElement;

export type DynamicComponent = () => {
  renderFn: () => Component;
  reactives?: Reactive<any>[];
  name?: string;
};

export type ComponentOutput = ReturnType<DynamicComponent>;
export type DomElement = HTMLElement;
