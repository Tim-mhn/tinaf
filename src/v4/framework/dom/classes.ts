import { toValue } from '../reactive/toValue';
import { getReactiveElements } from '../reactive/utils';
import { watchAllSources } from '../reactive/watch';
import { toArray } from '../utils/array';
import { AddClassesArgs } from './create-dom-element';

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

function getFormattedClasses(classes: AddClassesArgs) {
  const classesArr = toArray(classes);

  const stringClasses = classesArr.map(toValue);
  let formattedClasses = formatClassesToArray(stringClasses);
  return formattedClasses;
}

export function addClassToElement(
  element: HTMLElement,
  classes: AddClassesArgs
) {
  const classesArr = toArray(classes);
  const reactiveClasses = getReactiveElements(classesArr);

  let formattedClasses = getFormattedClasses(classes);
  element.classList.add(...formattedClasses);

  watchAllSources(reactiveClasses).subscribe(() => {
    element.className = '';
    const newFormattedClasses = getFormattedClasses(classes);
    element.classList.add(...newFormattedClasses);
  });
}
