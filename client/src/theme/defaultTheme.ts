import {createMuiTheme} from '@material-ui/core'
import {orange, red} from '@material-ui/core/colors'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[200]
        },
        secondary: {
            main: red[300]
        }
    }
})
