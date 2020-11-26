import React from 'react'
import {observer} from 'mobx-react'
import {Box, Divider, Paper} from '@material-ui/core'
import {IPost} from '../../../apis/Posts'
import Service from './service'
import Comment from './Comment'
import AddCommentField from './AddCommentField'

interface IProps {
  post: IPost
}

const Post = observer(
  class extends React.Component {
    //private readonly service: Service
    private readonly post: IPost = {id: 0, authorId: 0, authorName: '', content: ''}
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      this.post = props.post
      this.service = new Service({postId: props.post.id})
    }

    render() {
      const {comments} = this.service.state
      const {fetchComments} = this.service
      return (
        <Paper>
          <Box p={1} pl={2} pr={2} mt={2}>
            <div style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}
                 dangerouslySetInnerHTML={{__html: this.post.content}}></div>
          </Box>
          <Divider light/>
          <Box p={2} pb={0}>
            {comments.map(comment => <Comment key={comment.id} {...{comment}}/>)}
          </Box>
          <Divider light/>
          <AddCommentField {...{postId: this.post.id, fetchComments: fetchComments}}/>
        </Paper>
      )
    }
  }
)

export default Post
