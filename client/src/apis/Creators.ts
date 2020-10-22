interface ICreatorInfo {
    name: string
    tag: string
    bio: string | null
}

async function getCreatorInfo(id: string): Promise<ICreatorInfo> {
    console.log('getCreatorInfo')
    return {
        name: 'John Doe',
        tag: 'john_cool337',
        bio: "I'm an artist. I'm a performance artist."
    }
}

export {getCreatorInfo}
export type { ICreatorInfo }

