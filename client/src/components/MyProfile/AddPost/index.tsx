import React from 'react'
import {observer} from 'mobx-react'
import {Box, Button, Grid} from '@material-ui/core'
import Service from './service'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.css'
// @ts-ignore
import ImageCompress from 'quill-image-compress'

Quill.register('modules/imageCompress', ImageCompress)

interface IProps {
  fetchPosts: (() => void)
}

const AddPost = observer(
  class extends React.Component {
    private readonly service: Service
    public static modules: any
    public static formats: any

    constructor(props: IProps) {
      super(props)
      this.service = new Service({fetchPosts: props.fetchPosts})
    }

    render() {
      const {isEditing, inputPost} = this.service.state
      const {handleEditing, handlePostChange, handleSubmit} = this.service
      return (
        <>
          {
            isEditing ?
              <Grid container direction={'column'} alignItems={'center'}>
                <Grid item>
                  <ReactQuill
                    theme={'snow'}
                    onChange={handlePostChange}
                    value={inputPost}
                    placeholder={'Write something...'}
                    modules={AddPost.modules}
                    formats={AddPost.formats}
                  />
                </Grid>
                <Grid item>
                  <Box mt={2}>
                    <Button variant={'contained'} onClick={handleSubmit}>Post</Button>
                  </Box>
                </Grid>
              </Grid>
              :
              <Button variant={'contained'} onClick={handleEditing}>Add post</Button>
          }
        </>
      )
    }
  }
)

AddPost.modules = {
  imageCompress: {
    quality: 1,
    maxWidth: 400,
    maxHeight: 400,
    imageType: 'image/jpeg',
    debug: true,
  },
  toolbar: [
    [{'header': '1'}, {'header': '2'}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

AddPost.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default AddPost
