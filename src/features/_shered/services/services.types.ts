import { CatalogFilters, Produto } from "@/shered/shered.types"

// ------------------------
// Obter todos os itens do catalogo Api
// ------------------------
type fetchProductsPaginatedParams = { filtros: CatalogFilters, paginaAtual: number, limit: number, search?: string }

type fetchProductsPaginatedRespose = { itens: Produto[], totalPages: number }

export type fetchProductsPaginatedProps = (params: fetchProductsPaginatedParams) => Promise<fetchProductsPaginatedRespose>