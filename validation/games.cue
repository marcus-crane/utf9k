#GameEntry: {
    title: string
    platform: string
    replay?: bool 
    id: int
    cover: string
    link: string
    date_finished?: string
}

#ListType: {
    list: string
    games: [...#GameEntry] | null
}

#ListList: [...#ListType]

#ListList & [...]