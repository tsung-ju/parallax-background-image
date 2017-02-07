import { ToElement, ToElementArray } from './ToElement';
import { Options } from './Options';
import { Viewport } from './Viewport';
import { ParallaxElement } from './ParallaxElement';
import { Background, coverElement } from './Background';
export declare class Parallax {
    static getCSSBackgroundImage: string | Promise<string> | ((arg0: Element) => string | Promise<string>);
    static pesudoBefore: (el: ParallaxElement, image: HTMLImageElement, velocityScale: number) => Background;
    static insertImg: (el: ParallaxElement, image: HTMLImageElement, velocityScale: number) => Background;
    static coverElement: typeof coverElement;
    viewport: Viewport;
    constructor(element: ToElement<HTMLElement>, perspective?: number);
    add(elements: ToElementArray<HTMLElement>, partial?: Partial<Options>): Promise<null>[];
    addElement(element: HTMLElement, options: Options): Promise<void>;
}
