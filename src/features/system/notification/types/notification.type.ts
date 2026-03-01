export interface notification {
    id: string
    type: 'Error' | 'Warning' | 'Success'
    title: string,
    message: string,
    code?: string
}