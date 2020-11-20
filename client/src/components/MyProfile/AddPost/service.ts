import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'

interface IState {
  isEditing: boolean
  inputPost: string
}

export default class Service extends WithLoading {
  state: IState = observable({
    isEditing: false,
    inputPost: ''
  })

  constructor() {
    super()
  }

  handleEditing = action(
    () => {
      this.state.isEditing = true
    }
  )

  handlePostChange = action(
    (content: string) => {
      this.state.inputPost = content
    }
  )

  handleSubmit = action(
    async () => {
      this.state.isEditing = false
      this.state.inputPost = ''
      console.log(this.state.inputPost)
    }
  )


}
