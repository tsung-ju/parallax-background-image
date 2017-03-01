import { ObservableRect } from './Rect';
var Viewport = (function () {
    function Viewport(element, perspective) {
        element.style.overflowY = 'scroll';
        element.style['webkitOverflowScrolling'] = 'touch';
        element.style.transformStyle = 'flat';
        if (perspective !== Infinity) {
            element.style.perspective = perspective + 'px';
            element.style.perspectiveOrigin = '0 0';
        }
        this.element = element;
        this.perspective = perspective;
        this.rect = new ObservableRect(element);
    }
    return Viewport;
}());
export { Viewport };
