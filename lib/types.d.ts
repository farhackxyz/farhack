
export type MasonryGridImage = {
    alt: string;
    src: string;
}

export type OverallWinner = {
    place: number;
    name: string;
    project_link: string;
    team: string[]; // array of fnames
    description: string;
}

export type Prize = {
    company: string;
    company_link: string;
    prizes: string;
    prizes_link: string;
    amounts: string;
    winners: string[]; //array of fnames
}