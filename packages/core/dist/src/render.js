"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.renderApp = exports.render = exports.isComponent = exports.isHtmlOrComment = void 0;
const toValue_1 = require("./reactive/toValue");
const watch_1 = require("./reactive/watch");
function isHtmlOrComment(node) {
    return !('__isComponent' in node);
}
exports.isHtmlOrComment = isHtmlOrComment;
function isComponent(node) {
    try {
        return node && typeof node === 'object' && '__isComponent' in node;
    }
    catch (err) {
        throw new Error(`Cannot use 'in' in isComponent for node: ${node}`);
    }
}
exports.isComponent = isComponent;
function hasSources(sources) {
    return !!sources && sources.length > 0;
}
/**
 * Renders a placeholder comment if the renderFn returns null
 * @param renderFn
 * @returns
 */
function safeRender(renderFn) {
    const node = renderFn();
    if (node)
        return node;
    const commentText = `placeholder--${crypto.randomUUID()}`;
    const comment = document.createComment(commentText);
    return comment;
}
function render(component, parent) {
    const { renderFn, sources } = component;
    let node = safeRender(renderFn);
    if (isHtmlOrComment(node)) {
        parent.append(node);
        if (hasSources(sources)) {
            (0, watch_1.watchAllSources)(sources).subscribe(() => {
                const index = [...parent.childNodes].findIndex((n) => n === node);
                parent.removeChild(node);
                node = safeRender(renderFn);
                parent.insertBefore(node, [...parent.childNodes][index]);
            });
        }
        return node;
    }
    let html = render(node, parent);
    if (hasSources(sources)) {
        (0, watch_1.watchAllSources)(sources).subscribe(() => {
            const index = [...parent.childNodes].findIndex((n) => n === html);
            parent.removeChild(html);
            html = render(node, parent);
            parent.insertBefore(html, [...parent.childNodes][index]);
        });
    }
    return html;
}
exports.render = render;
function renderApp(id, component) {
    window.addEventListener('load', () => {
        const container = document.getElementById(id);
        render(component, container);
    });
}
exports.renderApp = renderApp;
const show = (cmp) => {
    return {
        when: (when) => {
            const sources = (0, toValue_1.isReactive)(when) ? [when] : [];
            const elseFn = (fallback) => ({
                renderFn: () => ((0, toValue_1.toValue)(when) ? cmp.renderFn() : fallback.renderFn()),
                sources,
                __isComponent: true,
            });
            return {
                else: elseFn,
                renderFn: () => ((0, toValue_1.toValue)(when) ? cmp.renderFn() : null),
                __isComponent: true,
                sources,
            };
        },
    };
};
exports.show = show;
