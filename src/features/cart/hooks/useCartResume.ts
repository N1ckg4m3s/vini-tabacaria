import { useCart } from "@/providers/cart.provider"
import { useCartResume_Props } from "../types/HooksProps"

export const useCartResume: useCartResume_Props = () => {
    const { total } = useCart()

    return {
        subTotal: total,
        entrega: 0,
        total: total
    }
}