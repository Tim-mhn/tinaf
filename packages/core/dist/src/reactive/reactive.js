"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = exports.bool = exports.reactive = exports.Reactive = void 0;
const rxjs_1 = require("rxjs");
class Reactive {
    _value;
    constructor(initialValue) {
        this._value = initialValue;
    }
    _valueChanges$ = new rxjs_1.Subject();
    valueChanges$ = this._valueChanges$.asObservable();
    update(newValue) {
        this._value = newValue;
        this._valueChanges$.next(newValue);
    }
    get value() {
        return this._value;
    }
}
exports.Reactive = Reactive;
function reactive(initialValue) {
    const rx = new Reactive(initialValue);
    return rx;
}
exports.reactive = reactive;
function bool(initialValue) {
    const rx = reactive(initialValue);
    const toggle = () => rx.update(!rx.value);
    return [rx, toggle];
}
exports.bool = bool;
class Computed {
    getterFn;
    valueChanges$;
    constructor(getterFn, sources) {
        this.getterFn = getterFn;
        if (sources.length === 0)
            throw new Error('Computed value was created without any source. Please include at least 1 source');
        this.valueChanges$ = (0, rxjs_1.combineLatest)(sources.map((s) => s.valueChanges$.pipe((0, rxjs_1.startWith)('')))).pipe((0, rxjs_1.skip)(1), (0, rxjs_1.map)(() => getterFn()));
    }
    get value() {
        return this.getterFn();
    }
}
function computed(getterFn, sources) {
    return new Computed(getterFn, sources);
}
exports.computed = computed;
