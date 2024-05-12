export type GameList = {
    list: string;
    games: Game[];
}

type Game = {
    id: number;
    title: string;
    link: string;
    platform: string;
    cover: Cover;
    replay: boolean;
    notes: string;
    updated: string;
    completed: string;
}

type Cover = {
    url: string;
    height: number;
    width: number;
}