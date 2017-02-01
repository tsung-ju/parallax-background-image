import { toElement } from './ToElement';
export class Viewport {
    constructor(element, perspective) {
        element = toElement(element);
        Object.assign(element.style, {
            overflowY: 'scroll',
            transformStyle: 'flat',
            perspective: perspective + 'px',
            perspectiveOrigin: '0 0'
        });
        this.element = element;
        this.perspective = perspective;
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
}
