import {action, observable} from 'mobx'
import {currentUser, IUser} from '../apis/Users'

class UserStore {
    @observable user: IUser | null = null
    private _isLoggedIn = observable.box(false)

    constructor() {
        this.fetchCurrentUser()
    }

    get isLoggedIn() {
        return this._isLoggedIn.get()
    }

    @action set isLoggedIn(value) {
        this._isLoggedIn.set(value)
    }

    @action
    async fetchCurrentUser() {
        let user = await currentUser()

        if (user.error) {
            this.isLoggedIn = false
            this.user = null
        } else {
            this.isLoggedIn = true
            this.user = user
        }
    }
}


let userStore = new UserStore()

export default userStore