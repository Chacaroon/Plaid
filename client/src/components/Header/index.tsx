import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box, Grid
} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {AccountCircle} from '@material-ui/icons'
import Service from './service'
import {history} from '../../stores/RouterStore'
import userStore from '../../stores/UserStore'

interface IProps {
}

const Header = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)

      this.service = new Service()
    }


    render() {
      const isLoggedIn = userStore.isLoggedIn
      const isCreator = userStore.user.roles.includes('creator')
      const {menuAnchor} = this.service.state
      const {
        handleClick,
        handleClose,
        handleLoginClick,
        handleLogout,
        handleProfile,
        handleRegisterClick,
        handleSettings
      } = this.service

      return (
        <AppBar position="sticky">
          <Toolbar>
            <Grid container direction={'row'} justify={'center'}>
              <Grid item xs={2} container alignItems={'center'}>
                <Typography variant="h6" style={{marginRight: 'auto'}}>
                  Plaid
                </Typography>
              </Grid>
              <Grid item xs={8} container justify={'center'}>
                <Button
                  onClick={() => history.push('/recommendations')}>
                  Recommendations
                </Button>
                <Button
                  onClick={() => history.push('/feed')}>
                  Feed
                </Button>
                {isCreator &&
                <Button
                    onClick={() => history.push('/creators/1')}> {/*TODO: redirect to user's blog*/}
                    My blog
                </Button>
                }
              </Grid>
              <Grid item xs={2} container justify={'flex-end'}>
                {isLoggedIn &&
                <Box style={{marginLeft: 'auto'}}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                </Box>
                }
                {!isLoggedIn &&
                <Box style={{marginLeft: 'auto'}}>
                    <Button onClick={handleRegisterClick}>
                        Register
                    </Button>
                    <Button onClick={handleLoginClick}>
                        Login
                    </Button>
                </Box>
                }
                <Menu
                  anchorEl={menuAnchor}
                  open={!!menuAnchor}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleSettings}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )
    }
  }
)

export default Header
