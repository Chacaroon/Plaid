import {IUserCredentials, login} from '../../apis/Users'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'

type IFields = IUserCredentials

export default class Service {
    readonly initialValues: IFields = {
        email: '',
        password: ''
    }

    constructor() {
    }

    handleSubmit = async (values: IFields) => {
        let data = await login(values)
        if (data.error) {
            alert('Unexpected error!')
        } else {
            userStore.isLoggedIn = true
            history.push('/feed')
        }
    }

    validateEmail = async (value: string): Promise<string | undefined> => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return 'Please enter valid e-mail'
        }
    }
}

