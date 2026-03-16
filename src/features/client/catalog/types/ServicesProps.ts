import { CatalogFilterSource, Produto } from "../../../../shered/shered.types"
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

export type loadFiltersInformaitonsProps = (params: loadFiltersInformaitonsParams) => Promise<void>