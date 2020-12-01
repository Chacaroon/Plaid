import React from 'react'
import {observer} from 'mobx-react'
import {Box, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import Service from './service'
import {matchPath} from 'react-router'
import {routerStore} from '../../../stores/RouterStore'

interface IProps {

}

const Chat = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      const chatId: number = (matchPath(routerStore.location.pathname, {
        path: '/inbox/:chatId'
      }) as any).params.chatId
      this.service = new Service(chatId)
    }

    render() {
      const {messages, inputMessage} = this.service.state
      const {handleMessageChange, handleSubmit} = this.service
      return (
        <Box mt={4}>
          <Grid container justify={'center'}>
            <Grid item xs={6}>
              <Paper>
                <Box p={2}>
                  {messages.map(message => <Box key={message.id}>
                    <Paper style={{backgroundColor: '#f6f6f6'}}>
                      <Box p={1} ml={1} mb={2}>
                        <Typography>{message.senderName} says:</Typography>
                        <Box ml={2} mt={1}><Typography>{message.content}</Typography></Box>
                      </Box>
                    </Paper>
                  </Box>)}
                  <Box display={'flex'} p={2}>
                    <TextField multiline fullWidth onChange={handleMessageChange}
                               value={inputMessage}/>
                    <Box ml={1}><Button variant={'contained'}
                                        onClick={handleSubmit}>Send</Button></Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }
)

export default Chat
