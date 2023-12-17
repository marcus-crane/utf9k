export type MetaOIA = {
    headings: string[];
    entries: Entry[];
    sources: Source[]
}

type Entry = {
    ID: number;
    RequestDate: string;
    Subject: string;
    DeniedUnder: string;
}

type Source = {
    SourceURL: string;
    SourceTitle: string;
    Duration: string;
}