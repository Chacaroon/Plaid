import {observer} from 'mobx-react'
import React from 'react'
import {matchPath} from 'react-router'
import {ICreatorInfo} from '../../apis/Users'
import {routerStore} from '../../stores/RouterStore'
import Header from './Header'
import Service from './service'
import Post from './Post'
import {Box, Grid} from '@material-ui/core'

interface IRouterParams {
  creatorId: number
}

interface IProps {
  match: {
    params: IRouterParams
  }
}

const CreatorBlog = observer(
  class extends React.Component {
    private readonly service: Service

    constructor(props: IProps) {
      super(props)

      const creatorId: number = (matchPath(routerStore.location.pathname, {
        path: '/creators/:creatorId'
      }) as any).params.creatorId
      this.service = new Service({creatorId})
    }

    render() {
      const {isLoading} = this.service
      const {creatorInfo, posts} = this.service.state

      if (isLoading) {
        return 'Loading...'
      }

      return (
        <Box pt={5}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xl={4}>
              <Header creatorInfo={creatorInfo as ICreatorInfo}/>
            </Grid>
          </Grid>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xl={6}>
              <Box mt={4}>
                {posts.map(post => <Post key={post.id} {...{post}}/>)}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )
    }
  }
)

export default CreatorBlog
