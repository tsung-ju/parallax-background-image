import {observable, action} from 'mobx'
import {scheduler} from 'dom-scheduler'

export class ObservableBoundingClientRect implements ClientRect {
    @observable bottom: number = 0
    @observable height: number = 0
    @observable left: number = 0
    @observable right: number = 0
    @observable top: number = 0
    @observable width: number = 0

    constructor (element: HTMLElement) {
        const watch = () => {
            this.update(element.getBoundingClientRect())
            scheduler.read(watch)
        }
        scheduler.read(watch)
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

