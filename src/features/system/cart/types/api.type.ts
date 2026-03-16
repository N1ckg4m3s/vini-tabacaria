import { CartItemStatus, Produto } from "../../../../shered/shered.types"

type verifyIdsParams = { products: Partial<Produto>[] }
export type verifyIdsProps = (params: verifyIdsParams) => Promise<verifyCartApiResponse[]>

export type verifyCartApiResponse = {
    id?: string,
    newPrice?: number
    oldPrice?: number,
    status: CartItemStatus
}