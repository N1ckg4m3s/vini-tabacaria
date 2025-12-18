import { CatalogFilters, Produto } from "@/shered/shered.types";
import { RefObject } from "react";

// ------------------------
// Catalog Products Hook
// ------------------------
export type CatalogProductsParams = {
    filtros: CatalogFilters;
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
export type ResponsiveColumnsParams = {
    numeroDeLinhas?: number;
    minSize?: number;
    gapSize?: number;
};

export type ResponsiveColumnsResponse = {
    containerRef: RefObject<HTMLDivElement | null>;
    numeroDeColunas: number;
    totalItensNaTela: number;
};

export type UseResponsiveColumnsProps = (params: ResponsiveColumnsParams) => ResponsiveColumnsResponse;

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
    toggleArrayFilter: <K extends keyof CatalogFilters>(field: K, value: string) => void
    toggleMetaFilter: < K extends keyof NonNullable<CatalogFilters['meta']>>(field: K, value: string) => void
    clearFilters: () => void
}


type useAppliedFiltersParams = {}

type useAppliedFiltersRespose = {
    filters: CatalogFilters,
    actions: FilterActions
}

export type useAppliedFiltersProps = (params: useAppliedFiltersParams) => Promise<useAppliedFiltersRespose>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => Promise<NO_NAME_Respose>