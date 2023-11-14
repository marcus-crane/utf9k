export type BookList = {
    list: string;
    goal: number;
    books: Book[];
}

type Book = {
    title: string;
    subtitle: string;
    author: string;
    cover: string;
    link: string;
    date_finished: string | null;
    rating: number | null;
    progress: number;
}