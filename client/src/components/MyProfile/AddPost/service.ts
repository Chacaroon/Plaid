import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {addPost} from '../../../apis/Posts'

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
      await addPost(this.state.inputPost)
      this.state.isEditing = false
      this.state.inputPost = ''
    }
  )


}
