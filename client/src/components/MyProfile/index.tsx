import {observer} from 'mobx-react'
import React from 'react'
import Service from './service'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
import Bio from './Bio'
import AddPost from './AddPost'
import Post from '../CreatorBlog/Post'

interface IProps {
}

const MyProfile = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)

      this.service = new Service()
    }

    render() {
      const {name, tag, email, bio} = this.service.state.profile
      const {posts} = this.service.state
      console.log(this.service.state)
      const isCreator = this.service.state.profile.roles.includes('creator')
      if (this.service.isLoading) {
        return 'Loading...'
      }

      return (
        <Box pt={5}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Paper>
                <Box p={2}>
                  <Box mb={2}>
                    <Typography variant={'h6'}>{name}</Typography>
                    <Box fontWeight={'fontWeightLight'} color={'text.secondary'}>
                      @{tag}
                    </Box>
                  </Box>
                  <Typography variant={'body2'}>{email}</Typography>
                  <Bio {...{bio}}/>
                  <Typography variant={'body1'}>isCreator: {isCreator ? 'Yes' : 'No'}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Box mt={3} display={'flex'} justifyContent={'center'}>
                <AddPost/>
              </Box>
            </Grid>
            <Grid container justify={'center'} alignItems={'center'}>
              <Grid item xl={6}>
                <Box mt={4}>
                  {posts.map(post => <Post key={post.id} {...{post}}/>)}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }
)

export default MyProfile
