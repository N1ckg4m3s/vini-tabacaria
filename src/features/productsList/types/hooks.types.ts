import { Produto } from "@/shered/shered.types"

// --------------------
// Obtem uma lista de produtos com base nas paginas
// --------------------
type useProductsListParams = {
    paginaAtual: number
    numeroPorPagina: number
}
type useProductsListResponse = {
    products: Produto[],
    totalPages: number
}
export type useProductsListProps = (params: useProductsListParams) => useProductsListResponse

// --------------------
// NO_NAME
// --------------------
type NoNameParams = {}
type NoNameResponse = {}
export type NoNameProps = (params: NoNameParams) => NoNameResponse
