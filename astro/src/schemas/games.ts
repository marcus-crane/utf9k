export type GameList = {
    list: string;
    games: Game[];
}

type Game = {
    id: number;
    title: string;
    link: string;
    platform: string;
    cover: string;
    replay: boolean;
    notes: string;
    updated: string;
    completed: string;
}