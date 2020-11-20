import React from 'react'
import {observer} from 'mobx-react'
import {Box, Button, Grid, TextField, Typography} from '@material-ui/core'
import Service from './service'

interface IProps {
  bio: string
}

const Bio = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)

      this.service = new Service(props.bio)
    }

    render() {
      let {bio, isEditing, inputBio} = this.service.state
      let {handleEditing, handleBioChange, handleSubmit} = this.service
      return (
        <Box mt={3} mb={3}>
          {isEditing ?
            <Grid container direction={'row'} alignItems={'flex-end'}>
              <TextField multiline onChange={handleBioChange} value={inputBio} />
              <Box ml={1}><Button variant={'contained'} onClick={handleSubmit}>Done</Button></Box>
            </Grid>
            :
            <Box>
              {bio ? <Typography variant={'body1'}>{bio}</Typography> :
              <Box fontSize={20} fontWeight={'fontWeightLight'} color={'text.secondary'}>
                your bio is empty
              </Box>}
              <Box mt={1}><Button variant={'contained'} onClick={handleEditing}>Edit bio</Button></Box>
            </Box>
          }
        </Box>
      )
    }
  }
)

export default Bio
