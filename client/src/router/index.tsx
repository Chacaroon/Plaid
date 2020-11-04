import React from 'react'
import {Route, Router, Switch} from 'react-router'
import CreatorBlog from '../components/CreatorBlog'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import {history} from '../stores/RouterStore'
import Header from '../components/Header'
import {Box} from '@material-ui/core'

export default function () {
    return (
        <Box m={-1}>
            <Router history={history}>
                <Header/>
                <Switch>
                    <Route exact path={'/creators/:creatorId'} render={() => <CreatorBlog/>}/>
                    <Route exact path={'/register'} render={() => <RegistrationForm/>}/>
                    <Route exact path={'/login'} render={() => <LoginForm/>}/>
                </Switch>
            </Router>
        </Box>
    )
}
