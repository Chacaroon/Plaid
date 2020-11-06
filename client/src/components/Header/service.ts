import { IUser } from "../../apis/Users";
import userStore from '../../stores/UserStore'

export default class Service {
    // get user() {
    //     return userStore.user
    // }

    get isLoggedIn() {
        return userStore.isLoggedIn
    }
}