import { Viewport } from './Viewport';
export declare class ParallaxElement {
    readonly id: string;
    readonly element: HTMLElement;
    readonly boundingClientRect: ClientRect;
    readonly viewport: Viewport;
    readonly velocityScale: number;
    constructor(element: HTMLElement, viewport: Viewport, velocityScale: number);
    readonly width: number;
    readonly height: number;
    readonly left: number;
    readonly top: number;
    private static nextId;
    private static getNextId();
}
