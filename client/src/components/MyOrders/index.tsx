
import React from 'react'
import {observer} from 'mobx-react'
import {Typography} from '@material-ui/core'

const MyOrders = observer(
  class extends React.Component {
    render() {
      return <Typography>MY ORDERS</Typography>
    }
  }
)

export default MyOrders
