import { CatalogFilterSource, Produto } from "@/shered/shered.types";
import { RefObject } from "react";

// ------------------------
// Catalog Products Hook
// ------------------------
export type CatalogProductsParams = {
    filtros?: SelectedFilters;
    paginaAtual: number;
    numeroPorPagina: number;
};

export type CatalogProductsResponse = {
    catalogProducts: Produto[];
    loading: boolean
    totalPages: number
};

export type UseCatalogProductsProps = (params: CatalogProductsParams) => CatalogProductsResponse;

// ------------------------
// Responsive Columns Hook
// ------------------------
export type ResponsiveColumnsResponse = {
    containerRef: RefObject<HTMLDivElement | null>;
    numeroDeColunas: number;
    totalItensNaTela: number;
};

export type UseResponsiveColumnsProps = () => ResponsiveColumnsResponse;

// ------------------------
// Pagination Hook
// ------------------------
export type PaginationParams = {
    totalItens: number;
    itensPorPagina: number;
};

export type PaginationResponse = {
    paginaAtual: number;
    numeroDePaginas: number;
    changePageTo: (page: number) => void;
};

export type UsePaginationProps = (params: PaginationParams) => PaginationResponse;

// ------------------------
// use applied filters
// ------------------------
export type FilterActions = {
    toggleFilter: <K extends keyof CatalogFilterSource>(field: K, value: string) => void
    verifyToggle: <K extends keyof CatalogFilterSource>(field: K, value: string) => boolean
    clearFilters: () => void
}


type useAppliedFiltersParams = {}

type useAppliedFiltersRespose = {
    filters: CatalogFilterSource,
    actions: FilterActions
}

export type useAppliedFiltersProps = (params: useAppliedFiltersParams) => Promise<useAppliedFiltersRespose>

// ------------------------
export type SelectedFilters = Record<string, Set<string>>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => Promise<NO_NAME_Respose>