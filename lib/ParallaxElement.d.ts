import { Viewport } from './Viewport';
import { Rect } from './Rect';
export declare class ParallaxElement {
    readonly id: string;
    readonly element: HTMLElement;
    readonly rect: Rect;
    readonly viewport: Viewport;
    readonly velocityScale: number;
    constructor(element: HTMLElement, viewport: Viewport, velocityScale: number);
    private static nextId;
    private static getNextId();
}
