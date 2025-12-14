// ------------------------
// Load catalog data service
// ------------------------
type loadCatalogParams = { filtros: any, paginaAtual: number, limit: number }
type loadCatalogRespose = { itens: any[], totalPages: number }

export type loadCatalogProps = (params: loadCatalogParams) => Promise<loadCatalogRespose>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => Promise<NO_NAME_Respose>