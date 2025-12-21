import { useCart } from "@/providers/cart.provider"

export const useCartResume = () => {
    const { produtos: cartProducts } = useCart()

    return { resume: '' }
}