"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentWithProps = exports.component = void 0;
function component(fn) {
    return {
        renderFn: fn,
        __isComponent: true,
    };
}
exports.component = component;
const componentWithProps = (fn) => (props) => component(() => fn(props));
exports.componentWithProps = componentWithProps;
/**
 *
 * const Card = componentWithProps<{ title : string, subtitle: string}>(( { title, subtitle}) => {
 *          return div(div(title), div(subtitle))
 * })
 *
 *
 * const App = cmp(() => {
 *
 *
 * const title = rx("hello")
 * const subtitle = rx("there")
 *    return div(
 *      Card({ title, subtitle}),
 *      Button()
 *   )
 * })
 */
