import { CatalogFilters } from "@/shered/shered.types";
// ------------------------
// Filtros
// ------------------------
export type Filtro = {
    titulo: string;
    opcoes: Record<string, boolean>;
};

export type MetaKeys = keyof NonNullable<CatalogFilters['meta']>