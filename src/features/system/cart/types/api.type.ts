import { ProductWithStatus, Produto } from "@/shered/shered.types"

type verifyIdsParams = { products: Partial<Produto>[] }
export type verifyIdsProps = (params: verifyIdsParams) => Promise<ProductWithStatus[]>
