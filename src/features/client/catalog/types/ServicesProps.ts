import { CatalogFilterSource, Produto } from "@/shered/shered.types"
import { SelectedFilters } from "./HooksProps"

// ------------------------
// Load catalog data service
// ------------------------
type loadCatalogParams = { filtros?: SelectedFilters, paginaAtual: number, limit: number }
export type loadCatalogRespose = { itens: Produto[], totalPages: number }

export type loadCatalogProps = (params: loadCatalogParams) => Promise<loadCatalogRespose>

// ------------------------
// Load filter informations
// ------------------------
type loadFiltersInformaitonsParams = { filtros: CatalogFilterSource }

type loadFiltersInformaitonsRespose = {}

export type loadFiltersInformaitonsProps = (params: loadFiltersInformaitonsParams) => Promise<loadFiltersInformaitonsRespose>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => Promise<NO_NAME_Respose>