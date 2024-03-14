"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStylesToElement = void 0;
const rxjs_1 = require("rxjs");
const toValue_1 = require("../reactive/toValue");
const object_1 = require("../utils/object");
function addStylesToElement(htmlElement, styles) {
    (0, object_1.objectEntries)(styles).forEach((style) => {
        const [property, value] = style;
        htmlElement.style[property] = (0, toValue_1.toValue)(value);
    });
    const reactiveStyles = (0, object_1.objectEntries)(styles).filter((style) => {
        const [_, value] = style;
        if ((0, toValue_1.isReactive)(value))
            return style;
    });
    const styleValueChanges$ = reactiveStyles.map(([property, reactiveValue]) => {
        return reactiveValue.valueChanges$.pipe((0, rxjs_1.map)((newValue) => ({ property, value: newValue })));
    });
    (0, rxjs_1.merge)(...styleValueChanges$).subscribe(({ property, value }) => {
        htmlElement.style[property] = value;
    });
}
exports.addStylesToElement = addStylesToElement;
