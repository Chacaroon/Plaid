import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import React from 'react'
import Router from './router'
import {theme} from './theme/defaultTheme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    )
}

export default App
