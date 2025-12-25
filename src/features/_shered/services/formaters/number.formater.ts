export const formateNumber = (
    value?: number,
    locale = 'pt-BR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
): string => {
    if (value == null || isNaN(value)) return '-'

    return value.toLocaleString(locale, {
        minimumFractionDigits,
        maximumFractionDigits,
    })
}
