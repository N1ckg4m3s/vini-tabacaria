import { CatalogFilters } from "@/shered/shered.types"
// ------------------------
// Obtem as informações de filtros
// ------------------------
type getFiltersInformationsParams = { filtros?: CatalogFilters }

type getFiltersInformationsRespose = { filtros: CatalogFilters }

export type getFiltersInformationsProps = (params: getFiltersInformationsParams) => Promise<getFiltersInformationsRespose>
