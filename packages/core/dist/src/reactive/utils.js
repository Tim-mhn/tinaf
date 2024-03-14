"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReactiveElements = void 0;
const array_1 = require("../utils/array");
const toValue_1 = require("./toValue");
function getReactiveElements(maybeArray) {
    const arr = (0, array_1.toArray)(maybeArray);
    return arr?.filter(toValue_1.isReactive);
}
exports.getReactiveElements = getReactiveElements;
