"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomElement = void 0;
const object_1 = require("../utils/object");
const toValue_1 = require("../reactive/toValue");
const utils_1 = require("../reactive/utils");
const render_1 = require("../render");
const classes_1 = require("./classes");
const styles_1 = require("./styles");
const _createDomElement = (props) => {
    const { children, classes, type, handlers, styles } = props;
    const reactiveChildren = (0, utils_1.getReactiveElements)(children);
    const renderFn = () => {
        const htmlElement = document.createElement(type);
        htmlElement.setAttribute('x-id', crypto.randomUUID());
        children?.forEach((child) => {
            if ((0, render_1.isComponent)(child)) {
                (0, render_1.render)(child, htmlElement);
            }
            else {
                const textContent = (0, toValue_1.toValue)(child).toString();
                htmlElement.append(textContent);
            }
        });
        if (classes)
            (0, classes_1.addClassToElement)(htmlElement, classes);
        if (handlers)
            addEventListenersToElement(htmlElement, handlers);
        if (styles)
            (0, styles_1.addStylesToElement)(htmlElement, styles);
        return htmlElement;
    };
    const on = (_handlers) => {
        const allHandlers = {
            ...(handlers || {}),
            ..._handlers,
        };
        return _createDomElement({
            ...props,
            handlers: allHandlers,
        });
    };
    const addClass = (newClasses) => {
        return _createDomElement({
            ...props,
            classes: newClasses,
        });
    };
    const addStyles = (newStyles) => {
        return _createDomElement({
            ...props,
            styles: newStyles,
        });
    };
    return {
        __isComponent: true,
        renderFn,
        on,
        addClass,
        addStyles,
        sources: reactiveChildren,
    };
};
const createDomElement = (type) => (...children) => {
    return _createDomElement({
        type,
        children,
    });
};
exports.createDomElement = createDomElement;
const addEventListenersToElement = (element, handlers) => {
    (0, object_1.objectEntries)(handlers).forEach((entry) => {
        const [event, handler] = entry;
        element.addEventListener(event, handler);
    });
};
