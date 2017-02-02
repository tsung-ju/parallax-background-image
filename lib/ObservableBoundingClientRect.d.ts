export declare class ObservableBoundingClientRect implements ClientRect {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    constructor(element: HTMLElement);
    update(rect: ClientRect): void;
}
