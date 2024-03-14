"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClassToElement = exports.formatClassesToArray = void 0;
const toValue_1 = require("../reactive/toValue");
const utils_1 = require("../reactive/utils");
const watch_1 = require("../reactive/watch");
const array_1 = require("../utils/array");
function formatClassesToArray(classOrClasses) {
    const allClassesAsString = typeof classOrClasses === 'string'
        ? classOrClasses
        : classOrClasses.join(' ');
    const classes = allClassesAsString
        .split(' ')
        .filter((cls) => cls.trim() !== '');
    return classes;
}
exports.formatClassesToArray = formatClassesToArray;
function getFormattedClasses(classes) {
    const classesArr = (0, array_1.toArray)(classes);
    const stringClasses = classesArr.map(toValue_1.toValue);
    let formattedClasses = formatClassesToArray(stringClasses);
    return formattedClasses;
}
function addClassToElement(element, classes) {
    const classesArr = (0, array_1.toArray)(classes);
    const reactiveClasses = (0, utils_1.getReactiveElements)(classesArr);
    let formattedClasses = getFormattedClasses(classes);
    element.classList.add(...formattedClasses);
    (0, watch_1.watchAllSources)(reactiveClasses).subscribe(() => {
        element.className = '';
        const newFormattedClasses = getFormattedClasses(classes);
        element.classList.add(...newFormattedClasses);
    });
}
exports.addClassToElement = addClassToElement;
