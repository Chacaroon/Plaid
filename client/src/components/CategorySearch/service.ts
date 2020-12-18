import {action, observable} from 'mobx'
import WithLoading from '../../services/WithLoading'
import {getCreators} from '../../apis/Category'

interface IState {
  selectedCategory: string,
  creators: Array<any>
}


export default class Service extends WithLoading {
  state: IState = observable(
    {selectedCategory: 'none', creators: []}
  )
  readonly categories = ['none', 'music', 'art', 'games', 'literature', 'travel']

  constructor() {
    super()
    this.searchCreators()
  }

  handleCategoryChange = action((event: React.ChangeEvent<{ value: unknown }>) => {
    this.state.selectedCategory = event.target.value as string
  })

  searchCreators = action(async () => {
    this.state.creators = await getCreators(this.state.selectedCategory)
  })
}
