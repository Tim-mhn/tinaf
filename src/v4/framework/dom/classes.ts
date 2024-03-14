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
