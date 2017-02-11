import {observable, action, IObservableObject} from 'mobx'
import {scheduler} from 'dom-scheduler'

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
            scheduler.read(watch)
        }
        watch()
    }

    @action
    update (rect: ClientRect) {
        this.bottom = rect.bottom
        this.height = rect.height
        this.left = rect.left
        this.right = rect.right
        this.top = rect.top
        this.width = rect.width
    }
}

