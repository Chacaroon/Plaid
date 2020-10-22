import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {ICreatorInfo} from '../../../apis/Creators'

interface IProps {
    creatorInfo: ICreatorInfo
}

const Header = observer(({creatorInfo}: IProps) => {
    const {name, tag, bio} = creatorInfo

    return (
        <div>
            <Typography variant={'h5'} component={'h1'}>{name}</Typography>
            <Typography color={'textSecondary'}>{tag}</Typography>
            <Typography>{bio}</Typography>
        </div>
    )
})

export default Header