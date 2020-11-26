import React from 'react'
import {observer} from 'mobx-react'
import {Box, Paper, Typography} from '@material-ui/core'
import {IComment} from '../../../../apis/Comments'

interface IProps {
  comment: IComment
}

const Comment = observer(
  class extends React.Component {
    //private readonly service: Service
    private readonly comment: IComment = {id: 0, authorId: 0, authorName: '', content: ''}

    constructor(props: IProps) {
      super(props)
      this.comment = props.comment
    }

    render() {
      return (
        <Paper style={{backgroundColor: '#f6f6f6'}}>
          <Box p={1} ml={1} mb={2}>
            <Typography>{this.comment.authorName} says:</Typography>
            <Box ml={1}><Typography>{this.comment.content}</Typography></Box>
          </Box>
        </Paper>
      )
    }
  }
)

export default Comment
