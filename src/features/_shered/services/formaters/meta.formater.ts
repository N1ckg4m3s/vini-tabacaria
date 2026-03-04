import { formateNumber } from "./number.formater"
import { formateText, formatListToText } from "./text.formater"

export const formatMetadataValue = (value: string | number | string[] | number[] | boolean): string => {
    if (Array.isArray(value)) {
        if (value.length === 0) return '-'
        return formatListToText(value.map(String))
    }

    if (typeof value === 'number') {
        return formateNumber(value)
    }

    return formateText(value)
}
