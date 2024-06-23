/* eslint-disable @typescript-eslint/no-explicit-any */
import { map, merge } from 'rxjs';
import type { ReactiveValue } from '../reactive/reactive';
import { isReactive, toValue } from '../reactive/toValue';
import type { MaybeReactive } from '../reactive/types';
import { objectEntries } from '../utils/object';

export type AddStylesArgs = Record<string, MaybeReactive<string>>;

export function addStylesToElement(
  htmlElement: HTMLElement,
  styles: AddStylesArgs
) {
  objectEntries(styles).forEach((style) => {
    const [property, value] = style;
    htmlElement.style[property as any] = toValue(value);
  });

  const reactiveStyles = objectEntries(styles).filter((style) => {
    const [_, value] = style;
    if (isReactive(value)) return style;
  }) as Array<[string, ReactiveValue<string>]>;

  const styleValueChanges$ = reactiveStyles.map(([property, reactiveValue]) => {
    return reactiveValue.valueChanges$.pipe(
      map((newValue) => ({ property, value: newValue }))
    );
  });

  merge(...styleValueChanges$).subscribe(({ property, value }) => {
    htmlElement.style[property as any] = value;
  });
}
