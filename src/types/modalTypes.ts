export interface modalContent {
    show: boolean,
    title: string,
    message: string,
    onAccept?(): void
}