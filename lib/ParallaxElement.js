import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { ObservableRect } from './Rect';
import { scheduler } from '@ray851107/dom-scheduler';
var ParallaxElement = (function () {
    function ParallaxElement(element, viewport, velocityScale) {
        var _this = this;
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.rect = new ObservableRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        scheduler.write(function () {
            _this.element.setAttribute(ATTR_PARALLAX_ELEMENT, _this.id);
        });
    }
    ParallaxElement.getNextId = function () {
        return "" + ParallaxElement.nextId++;
    };
    return ParallaxElement;
}());
export { ParallaxElement };
ParallaxElement.nextId = 0;
