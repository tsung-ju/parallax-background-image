var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { autorun } from 'mobx';
import { ATTR_PARALLAX_ELEMENT } from './Constants';
import { toElement, toElementArray } from './ToElement';
import { loadBackgroundImage } from './BackgroundImage';
import { fromPartial } from './Options';
import { prependStyleSheet } from './StyleSheet';
import { Viewport } from './Viewport';
import { ParallaxElement } from './ParallaxElement';
import { parallaxTransform } from './Transform';
initialize();
function initialize() {
    const styleSheet = prependStyleSheet();
    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] > * {
            position: relative;
        }
    `, 0);
    styleSheet.insertRule(`
        [${ATTR_PARALLAX_ELEMENT}] {
            position: relative;
            overflow: hidden;
        }
    `, 0);
}
export class Parallax {
    constructor(element, perspective = 1000) {
        this.viewport = new Viewport(toElement(element), perspective);
    }
    add(elements, partial = {}) {
        const options = fromPartial(partial);
        if (options.velocityScale < 0)
            throw new RangeError('velocityScale must be positive');
        return toElementArray(elements, this.viewport.element)
            .filter(element => !element.hasAttribute(ATTR_PARALLAX_ELEMENT))
            .map(element => this.addElement(element, options));
    }
    addElement(element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield loadBackgroundImage(element, options.backgroundImage);
            const parallaxElement = new ParallaxElement(element, this.viewport);
            const background = options.createBackground(parallaxElement, image, options.velocityScale);
            autorun(() => {
                background.updateTransform(parallaxTransform(parallaxElement, background, options.velocityScale));
            });
        });
    }
}
