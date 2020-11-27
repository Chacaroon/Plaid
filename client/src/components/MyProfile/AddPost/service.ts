import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {addPost} from '../../../apis/Posts'

interface IState {
  isEditing: boolean
  inputPost: string
}

interface IServiceParams {
  fetchPosts: (() => void)
}

export default class Service extends WithLoading {
  state: IState = observable({
    isEditing: false,
    inputPost: ''
  })

  private readonly fetchPosts: (() => void)

  constructor(params: IServiceParams) {
    super()
    this.fetchPosts = params.fetchPosts
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
      await this.fetchPosts()
    }
  )


}
