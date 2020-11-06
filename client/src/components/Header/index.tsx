import {Grid} from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button'
import {observer} from 'mobx-react'
import React from 'react'
import Service from './service'

interface IProps {
}

@observer
class Header extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
        super(props)

        this.service = new Service()
    }

    render() {
        const {isLoggedIn} = this.service

        return (
            <Box bgcolor={'primary.main'}>
                <Grid container justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Box color={'primary.contrastText'}>
                            <Typography variant={'h5'} component={'h1'}>Plaid</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box color={'primary.contrastText'}>
                            <Button color={'inherit'}>Feed</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Header