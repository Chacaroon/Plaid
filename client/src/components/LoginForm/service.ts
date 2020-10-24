import {FormikHelpers} from 'formik'
import {IUserCredentials, isEmailTaken, isTagTaken, login} from '../../apis/Users'
import {routerStore} from '../../stores/RouterStore'

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
        let user = await login(values)

        if (user.error) {
            setErrors({password: user.error.message})
        } else {
            routerStore.history.push('creators/1')  //TODO redirect to feed
        }
    }

    async validateEmail(value: string): Promise<string | undefined> {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return 'Please enter valid e-mail'
        }
    }
}

