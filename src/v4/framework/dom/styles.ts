import { map, merge } from 'rxjs';
import { ReactiveValue } from '../reactive/reactive';
import { isReactive, toValue } from '../reactive/toValue';
import { MaybeReactive } from '../reactive/types';
import { objectEntries } from '../utils/object';

export type AddStylesArgs = Record<string, MaybeReactive<string>>;

export function addStylesToElement(
  htmlElement: HTMLElement,
  styles: AddStylesArgs
) {
  objectEntries(styles).forEach((style) => {
    const [property, value] = style;
    htmlElement.style[property] = toValue(value);
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
    htmlElement.style[property] = value;
  });
}
