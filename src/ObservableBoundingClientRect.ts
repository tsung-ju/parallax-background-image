import {observable, action, IObservableObject} from 'mobx'

export class ObservableBoundingClientRect implements ClientRect {
    @observable bottom: number;
    @observable height: number;
    @observable left: number;
    @observable right: number;
    @observable top: number;
    @observable width: number;

    constructor (element: HTMLElement) {
        const watch = () => {
            this.update(element.getBoundingClientRect())
            window.requestAnimationFrame(watch)
        }
        watch()
    }

    @action
    update (rect: ClientRect) {
        for (let key of ['bottom', 'height', 'left', 'right', 'top', 'width']) {
            this[key] = rect[key]
        }
    }
}
