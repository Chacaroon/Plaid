import React from 'react'
import {observer} from 'mobx-react'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import Service from './service'
import {history} from '../../stores/RouterStore'

interface IProps {

}

const SearchCreators = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)
      this.service = new Service()
    }

    render() {
      const {inputName, creators} = this.service.state
      const {handleInputChange, searchCreators} = this.service
      return (
        <Box pt={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Box display={'flex'} alignItems={'center'} width={0.2}>
            <TextField variant={'outlined'} fullWidth value={inputName} onChange={handleInputChange}
                       label={'Search'}/>
            <Box ml={2}>
              <Button onClick={searchCreators} variant={'outlined'}>Search</Button>
            </Box>
          </Box>
          <Box display={'flex'} alignItems={'center'} width={0.4} flexDirection={'column'}>
            {creators.map((creator, i) => <Box key={i} width={1} mt={2}>
              <Paper>
                <Box p={2}>
                  <Typography variant={'h5'} component={'h1'}
                              onClick={() => history.push(`/creators/${creator.id}`)}>
                    {creator.name}
                  </Typography>
                  <Typography color={'textSecondary'}>@{creator.tag}</Typography>
                  <Divider/>
                  <Typography>{creator.bio}</Typography>
                </Box>
              </Paper>
            </Box>)}
          </Box>
        </Box>
      )
    }
  }
)

export default SearchCreators
