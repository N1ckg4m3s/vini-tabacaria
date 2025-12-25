export const formateText = (value?: unknown): string => {
    if (value == null) return '-'

    const text = String(value)

    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatListToText = (list: string[]): string => {
    if (!list || list.length === 0) return '-'

    const capitalized = list.map(item =>
        item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    )

    if (capitalized.length === 1) return capitalized[0]

    if (capitalized.length === 2) return `${capitalized[0]} e ${capitalized[1]}`

    const last = capitalized.pop()
    return `${capitalized.join(', ')} e ${last}`
}
