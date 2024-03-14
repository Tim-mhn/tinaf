"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toValue = exports.isReactive = exports.isSourceReactive = void 0;
const object_1 = require("../utils/object");
function isSourceReactive(maybeRx) {
    return (!!maybeRx &&
        typeof maybeRx === 'object' &&
        (isReactive) &&
        'update' in maybeRx);
}
exports.isSourceReactive = isSourceReactive;
function isReactive(maybeRx) {
    return !!maybeRx && typeof maybeRx === 'object' && 'value' in maybeRx;
}
exports.isReactive = isReactive;
function toValue(maybeRx) {
    if (isReactive(maybeRx))
        return maybeRx.value;
    if (maybeRx && typeof maybeRx === 'object') {
        let tmp = {};
        // todo: some nasty 'as any' over here :----/
        (0, object_1.objectKeys)(maybeRx).forEach((key) => {
            const v = maybeRx[key];
            const val = toValue(v);
            tmp[key] = val;
        });
        return tmp;
    }
    return maybeRx;
}
exports.toValue = toValue;
