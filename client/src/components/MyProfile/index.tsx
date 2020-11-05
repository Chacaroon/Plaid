import {observer} from 'mobx-react'
import React from 'react'
import Service from '../Header/service'
import {Typography} from '@material-ui/core'

interface IProps {
}

const MyProfile = observer(
    class extends React.Component {
        private readonly service: Service

        constructor(props: IProps) {
            super(props)

            this.service = new Service()
        }

        render() {
            return <Typography>USER PROFILE</Typography> //TODO make user profile
        }
    }
)

export default MyProfile
