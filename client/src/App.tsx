import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import React from 'react'
import Router from './router'
import {red, orange} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[200]
        },
        secondary: {
            main: red[300]
        }
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    )
}

export default App
