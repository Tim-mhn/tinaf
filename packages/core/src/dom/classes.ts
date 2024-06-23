import { isReactive, toValue } from '../reactive/toValue';
import { getReactiveElements } from '../reactive/utils';
import { watchAllSources } from '../reactive/watch';
import { type MaybeArray, toArray } from '../utils/array';
import type { AddClassesArgs } from './create-dom-element';
import { type MaybeReactive } from '../reactive/types';
import { objectEntries } from '../utils/object';
import { computed } from '../reactive';

export function formatClassesToArray(classOrClasses: string | string[]) {
  const allClassesAsString =
    typeof classOrClasses === 'string'
      ? classOrClasses
      : classOrClasses.join(' ');

  const classes = allClassesAsString
    .split(' ')
    .filter((cls) => cls.trim() !== '');
  return classes;
}

export function getFormattedClasses(
  classes: MaybeArray<MaybeReactive<string>>
) {
  const classesArr = toArray(classes);

  const stringClasses = classesArr.map(toValue);
  const formattedClasses = formatClassesToArray(stringClasses);
  return formattedClasses;
}

/**
 *
 *
 * Pass (dynamic) classes. Multiple options
 *
 * Pass a single string: 'bg-primary'
 * Pass an array of string: ['bg-primary', 'text-primary']
 * Pass a single reactive string
 * Pass an array of strings and reactive strings: ['bg-primary', myClass, myOtherClass]
 * Pass an object where keys are classes and values are reactive booleans
 * {
 *   'bg-primary text-primary': isPrimary,
 *   'bg-dark text-white':; isPrimary.not()
 * }
 * @param element
 * @param classes
 */

function isClassesRecord(
  classes: AddClassesArgs
): classes is Record<string, MaybeReactive<boolean>> {
  return !(
    Array.isArray(classes) ||
    isReactive(classes) ||
    typeof classes === 'string'
  );
}

export function addClassToElement(
  element: HTMLElement,
  classes: AddClassesArgs
) {
  const reactiveClassesArray = toReactiveClassesArray(classes);

  addDynamicClassesToElement(element, reactiveClassesArray);
}

function toReactiveClassesArray(classes: AddClassesArgs) {
  return toArray(
    isClassesRecord(classes)
      ? transformRecordIntoReactiveClassesArray(classes)
      : classes
  );
}

export function mergeClasses(
  classes: AddClassesArgs,
  newClasses: AddClassesArgs
) {
  const reactiveClassesArr1 = toReactiveClassesArray(classes);
  const reactiveClassesArr2 = toReactiveClassesArray(newClasses);

  return [...reactiveClassesArr1, ...reactiveClassesArr2];
}

function transformRecordIntoReactiveClassesArray(
  classes: Record<string, MaybeReactive<boolean>>
) {
  return objectEntries(classes).map((entry) => {
    const [className, condition] = entry;

    if (!isReactive(condition)) return toValue(condition) ? className : '';

    return computed(() => (condition.value ? className : ''), [condition]);
  });
}

function addDynamicClassesToElement(
  element: HTMLElement,
  classes: MaybeArray<MaybeReactive<string>>
) {
  const classesArr = toArray(classes);
  const reactiveClasses = getReactiveElements(classesArr);

  const formattedClasses = getFormattedClasses(classes);
  element.classList.add(...formattedClasses);

  watchAllSources(reactiveClasses).subscribe(() => {
    element.className = '';
    const newFormattedClasses = getFormattedClasses(classes);
    element.classList.add(...newFormattedClasses);
  });
}
