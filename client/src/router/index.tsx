import React from 'react'
import {Route, Router, Switch} from 'react-router'
import CreatorBlog from '../components/CreatorBlog'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import {history} from '../stores/RouterStore'

export default function () {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={'/creators/:creatorId'} render={() => <CreatorBlog />} />
                <Route exact path={'/register'} render={() => <RegistrationForm />} />
                <Route exact path={'/login'} render={() => <LoginForm />} />
            </Switch>
        </Router>
    )
}