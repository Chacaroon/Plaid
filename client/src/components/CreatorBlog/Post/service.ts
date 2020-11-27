import {action, observable} from 'mobx'
import WithLoading from '../../../services/WithLoading'
import {getComments, IComment} from '../../../apis/Comments'

interface IServiceParams {
  postId: number
}

interface IState {
  comments: Array<IComment>
  postId: number
}

class Service extends WithLoading {
  state: IState = observable(
    {
      comments: [],
      postId: 0
    })

  constructor(params: IServiceParams) {
    super()
    this.state.postId = params.postId
    this.fetchComments()
  }

  fetchComments = action(async () =>  {
    this.loading()
    this.state.comments = await getComments(this.state.postId)
    console.log("fetching comments")
    this.loaded()
  })
}

export default Service
