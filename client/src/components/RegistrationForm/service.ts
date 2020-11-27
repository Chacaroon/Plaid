import {INewUser, isEmailTaken, isTagTaken, register} from '../../apis/Users'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'
import {action} from 'mobx'

type IFields = INewUser

export default class Service {
  readonly initialValues: IFields = {
    name: '',
    tag: '',
    email: '',
    password: '',
    isCreator: false
  }

  handleSubmit = action(async (values: IFields) => {
      let data = await register(values)
      if (data.errorMessage) {
        alert(data.errorMessage)
      } else {
        userStore.isLoggedIn = true
        history.push('creators/1')
      }
    }
  )

  validateName = async (value: string): Promise<string> => {
    let errorMessage = ''

    if (!/^.{1,40}$/.test(value)) {
      errorMessage =
        `Name must have 1-40 characters.`
    }

    return errorMessage
  }

  validateTag = async (value: string): Promise<string | undefined> => {
    if (!/^[a-z0-9_]{6,12}$/.test(value)) {
      return `Tag must have 6-12 characters.
                Only lowercase latin letters, digits and _ are allowed`
    }

    let taken = await isTagTaken(value)
    if (taken) {
      return 'Tag already taken!'
    }
  }

  validateEmail = async (value: string): Promise<string | undefined> => {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
      return 'Invalid e-mail'
    }

    let taken = await isEmailTaken(value)
    if (taken) {
      return 'Email already taken!'
    }

  }

  validatePassword = async (value: string): Promise<string> => {
    let errorMessage = ''

    if (!/^[A-Za-z0-9]{8,16}$/.test(value)) {
      errorMessage = `Password must have 8-16 characters.
            Only latin letters and digits are allowed`
    }

    return errorMessage
  }
}

