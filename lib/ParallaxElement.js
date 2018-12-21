import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { ObservableRect } from './Rect';
import { scheduler } from '@ray851107/dom-scheduler';
export class ParallaxElement {
    constructor(element, viewport, velocityScale) {
        this.id = ParallaxElement.getNextId();
        this.element = element;
        this.rect = new ObservableRect(element);
        this.viewport = viewport;
        this.velocityScale = velocityScale;
        scheduler.write(() => {
            this.element.setAttribute(ATTR_PARALLAX_ELEMENT, this.id);
        });
    }
    static getNextId() {
        return `${ParallaxElement.nextId++}`;
    }
}
ParallaxElement.nextId = 0;
