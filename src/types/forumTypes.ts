export interface postInfoResume {
    title: string,
    slug: string,
    author: {username: string, picture: string},
    time_difference: string,
    subsection: string
}

export interface subsectionType {
    id: number,
    name: string
}