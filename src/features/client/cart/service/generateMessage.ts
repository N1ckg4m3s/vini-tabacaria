import { formatePrice } from "@/_shered/services/formaters/price.formater"

export const generateMessage = (orderId: string, total: number): string => {
    const safeOrderId = orderId.slice(0, 10)
    const baseUrl = window.location.origin

    return [
        "Olá, Fiz uma cotação pelo site",
        "",
        `Pedido: ${safeOrderId}`,
        `Total: ${formatePrice(total)}`,
        `Link: ${baseUrl}/order/${orderId}`
    ].join("\n")
}