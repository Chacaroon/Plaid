import React, {Fragment} from 'react'
import {observer} from 'mobx-react'
import {Box, Divider, Grid, IconButton, Paper, TextField, Typography} from '@material-ui/core'
import Service from './service'
import {Add, Clear, Done} from '@material-ui/icons'

interface IProps {

}

const SubscriptionLevels = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)

      this.service = new Service()
    }

    render() {
      const {levels, isEditing, inputCost, inputName} = this.service.state
      const {
        handleEditing,
        handleNameChange,
        handleCostChange,
        handleSubmit,
        handleRemove
      } = this.service

      return (
        <Paper style={{backgroundColor: '#f8f8f8'}} variant={'outlined'}>
          <Box p={2} pb={0}>
            <Box pb={2} display={'flex'} justifyContent={'center'}>
              <Typography>SUBSCRIPTION LEVELS</Typography>
            </Box>
            <Paper variant={'outlined'}>
              {levels.map(level => <Box key={level.id}> <Box p={2}>
                  <Grid container justify={'space-between'} alignItems={'center'}>
                    <Grid item xs={6}><Typography>{level.name}</Typography></Grid>
                    <Grid item xs={2}><Typography>{level.cost}$</Typography></Grid>
                    <Grid item>
                      <IconButton style={{padding: 0}} onClick={() => handleRemove(level.id)}>
                        <Clear/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
                  <Divider light/>
                </Box>
              )}
            </Paper>

            <Box pt={2} pb={2}>
              {!isEditing ?
                <Box display={'flex'} justifyContent={'center'}>
                  <IconButton style={{padding: 0}} onClick={handleEditing}>
                    <Add/>
                  </IconButton>
                </Box> :
                <Paper variant={'outlined'}>
                  <Box p={2}>
                    <Grid container alignItems={'center'} justify={'space-between'}>
                      <Grid item xs={6}>
                        <TextField fullWidth
                                   placeholder={'Name'}
                                   onChange={handleNameChange}
                                   value={inputName}/>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField fullWidth
                                   placeholder={'Cost, $'}
                                   onChange={handleCostChange}
                                   value={inputCost}/>
                      </Grid>
                      <Grid item>
                        <IconButton style={{padding: 0}} onClick={handleSubmit}>
                          <Done/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              }
            </Box>
          </Box>
        </Paper>
      )
    }
  }
)

export default SubscriptionLevels
