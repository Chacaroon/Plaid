import {observer} from 'mobx-react'
import React from 'react'
import {matchPath} from 'react-router'
import {ICreatorInfo} from '../../apis/Creators'
import {routerStore} from '../../stores/RouterStore'
import Header from './Header'
import Service from './service'

interface IRouterParams {
    creatorId: string
}

interface IProps {
    match: {
        params: IRouterParams
    }
}

@observer
class CreatorBlog extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
        super(props)

        console.dir(routerStore)

        const creatorId: string = (matchPath(routerStore.location.pathname, {
            path: '/creators/:creatorId'
        }) as any).params.creatorId
        this.service = new Service({creatorId})
    }

    render() {
        const {isLoading, creatorInfo} = this.service

        if (isLoading) {
            return 'Loading...'
        }

        return (
            <Header creatorInfo={creatorInfo as ICreatorInfo}/>
        )
    }
}

export default CreatorBlog