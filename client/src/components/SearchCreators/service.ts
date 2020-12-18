import {action, observable} from 'mobx'
import WithLoading from '../../services/WithLoading'
import {getCreators} from '../../apis/Category'
import {searchByName} from '../../apis/Users'

interface IState {
  inputName: string,
  creators: Array<any>
}


export default class Service extends WithLoading {
  state: IState = observable(
    {inputName: '', creators: []}
  )

  constructor() {
    super()
    this.searchCreators()
  }

  handleInputChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
    this.state.inputName = event.target.value
  })

  searchCreators = action(async () => {
    this.state.creators = await searchByName(this.state.inputName)
  })
}
