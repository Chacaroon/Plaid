import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {updateBio} from '../../../apis/Users'

interface IState {
  bio: string
  isEditing: boolean
  inputBio: string
}

export default class Service extends WithLoading {
  state: IState = observable({
    bio: '',
    isEditing: false,
    inputBio: ''
  })

  constructor(bio: string) {
    super()
    this.state.bio = bio ?? ''
    this.state.inputBio = bio ?? ''
  }

  handleEditing = action(
    () => {
      this.state.isEditing = true
    }
  )

  handleBioChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      this.state.inputBio = event.target.value
    }
  )

  handleSubmit = action(
    async () => {
      await updateBio(this.state.inputBio)
      this.state.bio = this.state.inputBio
      this.state.isEditing = false
    }
  )


}
