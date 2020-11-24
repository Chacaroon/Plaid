import React from 'react'
import {observer} from 'mobx-react'
import {Box, Paper} from '@material-ui/core'
import {IPost} from '../../../apis/Posts'

interface IProps {
  post: IPost
}

const Post = observer(
  class extends React.Component {
    //private readonly service: Service
    private readonly post: IPost = {id: 0, content: ''}

    constructor(props: IProps) {
      super(props)
      this.post = props.post
      console.log(props)
    }

    render() {
      return (
        <Paper>
          <Box p={1} pl={2} pr={2} mt={2}>
            <div style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}
                 dangerouslySetInnerHTML={{__html: this.post.content}}></div>
          </Box>
        </Paper>
      )
    }
  }
)

export default Post
