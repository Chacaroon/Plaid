import React from 'react'
import {observer} from 'mobx-react'
import {Box, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import Service from './service'
import {history} from '../../stores/RouterStore'

interface IProps {

}

const Inbox = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      this.service = new Service()
    }

    render() {
      const {chats} = this.service.state
      return (
        <Box mt={4}>
          <Grid container justify={'center'}>
            <Grid item xs={6}>
              {chats.map(chat => <Box mb={3} key={chat.id}>
                <Paper variant={'outlined'}>
                  <Box p={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Chat with {chat.name}</Typography>
                    <Button variant={'contained'} onClick={() => history.push('/inbox/' + chat.id)}>Open</Button>
                  </Box>
                </Paper>
              </Box>)}
            </Grid>
          </Grid>
        </Box>
      )
    }
  }
)

export default Inbox
