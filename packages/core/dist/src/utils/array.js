"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
function toArray(maybeArr) {
    return Array.isArray(maybeArr) ? maybeArr : [maybeArr];
}
exports.toArray = toArray;
