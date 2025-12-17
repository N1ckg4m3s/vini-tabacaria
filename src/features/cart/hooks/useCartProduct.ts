import { Produto } from "@/shered/shered.types";
import { useState } from "react"

export const useCartProduct = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [cartProducts, setCartProducts] = useState<Produto[]>([]);


    return { loading }
}