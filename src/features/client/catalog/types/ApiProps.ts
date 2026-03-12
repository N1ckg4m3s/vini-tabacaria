import { CatalogFilterSource, CatalogFilterSourceSanitized } from "@/shered/shered.types"
// ------------------------
// Obtem as informações de filtros
// ------------------------
type getFiltersInformationsParams = { filtros: CatalogFilterSourceSanitized }

export type getFiltersInformationsProps = (params: getFiltersInformationsParams) => Promise<CatalogFilterSource>
