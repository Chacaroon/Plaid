import {IObservableValue, observable} from 'mobx'
import {getCreatorInfo, ICreatorInfo} from '../../apis/Creators'
import WithLoading from '../../services/WithLoading'

interface IServiceParams {
    creatorId: string
}

class Service extends WithLoading {
    private creatorId: IObservableValue<string>
    creatorInfo?: ICreatorInfo = observable({name: '', tag: '', bio: null})

    constructor(params: IServiceParams) {
        super()
        this.creatorId = observable.box(params.creatorId)

        this.fetchCreatorInfo()
    }

    async fetchCreatorInfo() {
        this.loading()
        this.creatorInfo = await getCreatorInfo(this.creatorId.get())
        this.loaded()
    }
}

export default Service
