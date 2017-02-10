import { ToElement, ToElementArray } from './ToElement';
import { Options } from './Options';
import { Viewport } from './Viewport';
import { ParallaxElement } from './ParallaxElement';
import { Background, coverElement } from './Background';
import { Scheduler } from 'dom-scheduler';
export declare class Parallax {
    static scheduler: Scheduler;
    static getCSSBackgroundImage: string | Promise<string> | ((arg0: Element) => string | Promise<string>);
    static pesudoBefore: (el: ParallaxElement, image: HTMLImageElement) => Background;
    static insertImg: (el: ParallaxElement, image: HTMLImageElement) => Background;
    static coverElement: typeof coverElement;
    viewport: Viewport;
    useFallback: boolean;
    constructor(element: ToElement<HTMLElement>, useFallback?: boolean, perspective?: number);
    add(elements: ToElementArray<HTMLElement>, partial?: Partial<Options>): Promise<null>[];
    addElement(element: HTMLElement, options: Options): Promise<void>;
}
