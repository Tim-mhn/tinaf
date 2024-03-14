"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchAllSources = void 0;
const rxjs_1 = require("rxjs");
function watchAllSources(sources) {
    return (0, rxjs_1.combineLatest)(sources.map((s) => s.valueChanges$.pipe((0, rxjs_1.startWith)('')))).pipe((0, rxjs_1.skip)(1));
}
exports.watchAllSources = watchAllSources;
