import {action, observable} from 'mobx'
import WithLoading from '../../../../services/WithLoading'
import {addComment} from '../../../../apis/Comments'

interface IServiceParams {
  postId: number
  fetchComments: (() => void)
}

interface IState {
  isEditing: boolean
  inputComment: string
  postId: number
}

export default class Service extends WithLoading {
  state: IState = observable({
    isEditing: false,
    inputComment: '',
    postId: 0,
  })
  private readonly fetchComments: () => void

  constructor(params: IServiceParams) {
    super()
    this.state.postId = params.postId
    this.fetchComments = params.fetchComments
  }

  handleEditing = action(
    () => {
      this.state.isEditing = true
    }
  )

  handleCommentChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      this.state.inputComment = event.target.value
    }
  )

  handleSubmit = action(
    async () => {
      await addComment({postId: this.state.postId, content: this.state.inputComment})
      await this.fetchComments()
      this.state.inputComment = ''
      this.state.isEditing = false
    }
  )


}
