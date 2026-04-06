import { CartProduto } from "@/shered/shered.types"

export const getLocalData = () => {
    const data = localStorage.getItem('cartData')
    if (!data) return null
    return JSON.parse(data)
}

export const setLocalData = (data: CartProduto[]) => {
    localStorage.setItem('cartData', JSON.stringify(data))
}