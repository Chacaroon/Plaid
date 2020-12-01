import {Box, Button, Divider, Grid, MenuItem, Paper, Select, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {ICreatorInfo} from '../../../apis/Users'
import Service from './service'
import userStore from '../../../stores/UserStore'

interface IProps {
  creatorInfo: ICreatorInfo
}


const Header = observer(
  class extends React.Component {
    private readonly creatorInfo: ICreatorInfo
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      this.creatorInfo = props.creatorInfo
      this.service = new Service({creatorId: props.creatorInfo.id})
    }

    render() {
      const {bio, tag, name, id} = this.creatorInfo
      const {subscriptionLevels, selectedLevelId} = this.service.state
      const {handleLevelSelect, handleSubscribe} = this.service
      const selectedLevel = subscriptionLevels.find(lvl => lvl.id == selectedLevelId)
      return (
        <Paper>
          <Box p={2} display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography variant={'h5'} component={'h1'}>{name}</Typography>
              <Typography color={'textSecondary'}>@{tag}</Typography>
              <Typography>{bio}</Typography>
            </Box>
            {id !== userStore.user.id && <Box p={2}>
                <Button variant={'contained'}>Make an order</Button>
            </Box>}
          </Box>
          <Divider light/>
          {id !== userStore.user.id &&
          <Box p={2}>
              <Paper style={{backgroundColor: '#f8f8f8'}} variant={'outlined'}>
                  <Box p={2}>
                      <Box display={'flex'} justifyContent={'center'}>
                          <Typography>SUBSCRIBE</Typography>
                      </Box>
                      <Grid container justify={'space-between'} alignItems={'center'}>
                          <Grid item xs={4}>
                              <Select fullWidth value={selectedLevelId}
                                      onChange={handleLevelSelect}>
                                {subscriptionLevels.map(level => <MenuItem
                                  value={level.id} key={level.id}>{level.name}</MenuItem>)}
                              </Select>
                          </Grid>
                          <Grid item>
                              <Button variant={'contained'} disableElevation
                                      onClick={handleSubscribe}>
                                  Subscribe for {selectedLevel ? selectedLevel.cost : 0}$
                              </Button>
                          </Grid>
                      </Grid>
                  </Box>
              </Paper>
          </Box>
          }
        </Paper>
      )
    }
  }
)

export default Header
