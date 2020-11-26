import React from 'react'
import {observer} from 'mobx-react'
import {Box, Button, IconButton, TextField} from '@material-ui/core'
import Service from './service'
import {AddComment} from '@material-ui/icons'

interface IProps {
  postId: number
  fetchComments: (() => void)
}

const AddCommentField = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      this.service = new Service({postId: props.postId, fetchComments: props.fetchComments})
    }

    render() {
      let {isEditing, inputComment} = this.service.state
      let {handleEditing, handleCommentChange, handleSubmit} = this.service
      return (
        <>
          {isEditing ?
            <Box display={'flex'} p={2}>
              <TextField multiline fullWidth onChange={handleCommentChange} value={inputComment}/>
              <Box ml={1}><Button variant={'contained'} onClick={handleSubmit}>Done</Button></Box>
            </Box>
            :
            <Box p={1}>
              <IconButton onClick={handleEditing}>
                <AddComment/>
              </IconButton>
            </Box>
          }
        </>
      )
    }
  }
)

export default AddCommentField
