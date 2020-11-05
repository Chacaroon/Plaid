import {FormikHelpers} from 'formik'
import {IUserCredentials, login, testToken} from '../../apis/Users'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'

type IFields = IUserCredentials

export default class Service {
    readonly initialValues: IFields = {
        email: '',
        password: ''
    }

    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    async handleSubmit(values: IFields, {setErrors}: FormikHelpers<IFields>) {
        let res = await login(values)
        if (res.error) {
            alert('Unexpected error!')
        } else {
            localStorage.setItem('access-token', res.data.accessToken)
            userStore.isLoggedIn = true
            history.push('creators/1')  //TODO redirect to recommendations
        }
    }

    async validateEmail(value: string): Promise<string | undefined> {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return 'Please enter valid e-mail'
        }
    }
}

