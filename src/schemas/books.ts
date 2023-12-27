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
    cover_height?: number;
    cover_width?: number;
    link: string;
    date_finished: Date | null;
    recommended: boolean;
    progress: number;
}