import {FormikBag, FormikValues} from 'formik'
import {INewUser, isEmailTaken, isTagTaken, register} from '../../apis/Users'
import {routerStore} from '../../stores/RouterStore'

type IFields = INewUser

export default class Service {
    readonly initialValues: IFields = {
        name: '',
        tag: '',
        email: '',
        password: '',
        isCreator: false
    }

    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validateTag = this.validateTag.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
    }

    async handleSubmit(values: IFields) {
        let user = await register(values)
        console.log(values)
        if (user.error) {
            alert('Unexpected error!')
        } else {
            routerStore.history.push('creators/1')  //TODO redirect to recommendations
        }
    }

    validateName(value: string): string {
        let errorMessage = ''

        if (!/^.{1,40}$/.test(value)) {
            errorMessage =
                `Name must have 1-40 characters.`
        }

        return errorMessage
    }

    async validateTag(value: string): Promise<string | undefined> {
        if (!/^[a-z0-9_]{6,12}$/.test(value)) {
            return `Tag must have 6-12 characters.
                Only lowercase latin letters, digits and _ are allowed`
        }

        let tag = await isTagTaken(value)
        if (tag.error) {
            alert('Unexpected error!')
        } else {
            if (tag.isTaken) {
                return 'Tag already taken!'
            }
        }
    }

    async validateEmail(value: string): Promise<string | undefined> {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return 'Invalid e-mail'
        }

        let email = await isEmailTaken(value)
        if (email.error) {
            alert('Unexpected error!')
        } else {
            if (email.isTaken) {
                return 'Email already taken!'
            }
        }
    }

    validatePassword(value: string): string {
        let errorMessage = ''

        if (!/^[A-Za-z0-9]{8,16}$/.test(value)) {
            errorMessage = `Password must have 8-16 characters.
            Only latin letters and digits are allowed`
        }

        return errorMessage
    }
}

