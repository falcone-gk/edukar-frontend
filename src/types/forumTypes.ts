interface authorStructure {
    username: string,
    picture: string
}

interface baseContentStructure {
    author: authorStructure,
    body: string,
    date: string,
}

interface postInfo {
    subsection: string,
    title: string
}

export type postStructure = baseContentStructure & postInfo
export type commentStructure = baseContentStructure & {id: number, replies: baseContentStructure[]}

export interface postInfoResume {
    title: string,
    slug: string,
    author: authorStructure,
    time_difference: string,
    subsection: string
}

export interface subsectionType {
    id: number,
    name: string
}