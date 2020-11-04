import {
    Button,
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Box
} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {AccountCircle} from '@material-ui/icons'
import Service from './service'

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
            const {menuAnchor, isLoggedIn} = this.service.state
            const {handleClick, handleClose, handleLogin, handleLogout} = this.service

            return (
                <AppBar position="sticky">
                    <Toolbar>
                        <Box display={'flex'} style={{width: '100%'}} alignItems={'center'}>
                            <Typography variant="h6">
                                Plaid
                            </Typography>
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
                                <Button onClick={handleLogin} color={'secondary'}
                                        style={{color: 'white'}}>
                                    Register
                                </Button>
                                <Button onClick={handleLogin} color={'secondary'}
                                        style={{color: 'white'}}>
                                    Login
                                </Button>
                            </Box>
                            }
                            <Menu
                                anchorEl={menuAnchor}
                                open={!!menuAnchor}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            )
        }
    }
)

export default Header
