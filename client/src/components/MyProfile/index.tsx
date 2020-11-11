import {observer} from 'mobx-react'
import React from 'react'
import Service from './service'
import {Box, Grid, Paper, Typography} from '@material-ui/core'

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
      console.log(this.service.state)
      const isCreator = this.service.state.profile.roles.includes('creator')
      if (this.service.isLoading) {
        return 'Loading...'
      }

      return (
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper>
              <Box p={2}>
                <Box mb={2}>
                  <Typography variant={'h6'}>{name}</Typography>
                  <Box fontWeight={'fontWeightLight'} color={'text.secondary'}>
                    @{tag}
                  </Box>
                </Box>
                <Typography variant={'body2'}>{email}</Typography>
                {bio && <Typography variant={'body1'}>{bio}</Typography>}
                <Typography variant={'body1'}>isCreator: {isCreator ? 'Yes' : 'No'}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }
)

export default MyProfile
