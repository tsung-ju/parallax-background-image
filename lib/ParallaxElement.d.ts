import { Viewport } from './Viewport';
export declare class ParallaxElement {
    readonly id: string;
    readonly element: HTMLElement;
    readonly boundingClientRect: ClientRect;
    readonly viewport: Viewport;
    constructor(element: HTMLElement, viewport: Viewport);
    readonly width: number;
    readonly height: number;
    readonly left: number;
    private static nextId;
    private static getNextId();
}
