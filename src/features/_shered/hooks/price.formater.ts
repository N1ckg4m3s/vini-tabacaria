export const formatePrice = (
    value?: number,
    locale = 'pt-BR',
    currency = 'BRL'
): string => {
    if (value == null || isNaN(value)) return '-'

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value)
}
