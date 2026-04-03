// --------------------
// Card Component Types
// --------------------
export interface CardProps {
    title: string
    value: string | null
    obs: string
}

// --------------------
// Table Item Type
// --------------------
export type TableItem = {
    name: string
    value: number | string
    variant?: 'positive' | 'negative'
}
// --------------------
// Table Component Types
// --------------------
export interface TableProps {
    title: string
    items: TableItem[]
}