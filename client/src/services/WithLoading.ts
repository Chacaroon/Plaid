import {action, computed, makeObservable, observable} from 'mobx'

export default class WithLoading {
    _loading: boolean = false
    constructor() {
        makeObservable(this, {
            _loading: observable,
            isLoading: computed,
            loading: action,
            loaded: action
        })
    }

    get isLoading() {
        return this._loading
    }

    loading() {
        this._loading = true
    }

    loaded() {
        this._loading = false
    }
}
