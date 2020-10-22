import React from 'react'
import {Route, Router, Switch} from 'react-router'
import CreatorBlog from '../components/CreatorBlog'
import {history} from '../stores/RouterStore'

export default function () {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={'/creators/:creatorId'} render={() =>
                    <CreatorBlog/>}/>
            </Switch>
        </Router>
    )
}