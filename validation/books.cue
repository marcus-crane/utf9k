#BookEntry: {
    title: string
    subtitle: string | null
    author: string
    cover: string
    link: string
    date_finished: string | null
    rating: int | null
    progress: int
}

#YearEntry: {
    list: int
    goal: int | null
    books: [...#BookEntry]
}

#YearList: [...#YearEntry]

#YearList & [...]