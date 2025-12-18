import { CatalogFilters, Produto } from "@/shered/shered.types"

// ------------------------
// Obter todos os itens do catalogo Api
// ------------------------
type getAllCatalogItensParams = { filtros: CatalogFilters, paginaAtual: number, limit: number }

type getAllCatalogItensRespose = { itens: Produto[], totalPages: number }

export type getAllCatalogItensProps = (params: getAllCatalogItensParams) => Promise<getAllCatalogItensRespose>

// ------------------------
// NO NAME
// ------------------------
type getFiltersInformationsParams = { filtros?: CatalogFilters }

type getFiltersInformationsRespose = { filtros: CatalogFilters }

export type getFiltersInformationsProps = (params: getFiltersInformationsParams) => Promise<getFiltersInformationsRespose>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => Promise<NO_NAME_Respose>