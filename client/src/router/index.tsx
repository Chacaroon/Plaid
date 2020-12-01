import React from 'react'
import {Route, Router, Switch} from 'react-router'
import CreatorBlog from '../components/CreatorBlog'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import {history} from '../stores/RouterStore'
import Header from '../components/Header'
import {Box} from '@material-ui/core'
import MyProfile from '../components/MyProfile'
import Feed from '../components/Feed'
import Recommendations from '../components/Recommendations'
import Settings from '../components/Settings'
import MyOrders from '../components/MyOrders'
import Inbox from '../components/Inbox'
import Chat from '../components/Inbox/Chat'

export default function () {
    return (
        <Box m={-1}>
            <Router history={history}>
                <Header/>
                <Switch>
                    <Route exact path={'/creators/:creatorId'} render={() => <CreatorBlog/>}/>
                    <Route exact path={'/register'} render={() => <RegistrationForm/>}/>
                    <Route exact path={'/login'} render={() => <LoginForm/>}/>
                    <Route exact path={'/profile'} render={() => <MyProfile/>}/>
                    <Route exact path={'/orders'} render={() => <MyOrders/>}/>
                    <Route exact path={'/inbox'} render={() => <Inbox/>}/>
                    <Route exact path={'/inbox/:chatId'} render={() => <Chat/>}/>
                    <Route exact path={'/feed'} render={() => <Feed/>}/>
                    <Route exact path={'/recommendations'} render={() => <Recommendations/>}/>
                    <Route exact path={'/settings'} render={() => <Settings/>}/>
                </Switch>
            </Router>
        </Box>
    )
}
