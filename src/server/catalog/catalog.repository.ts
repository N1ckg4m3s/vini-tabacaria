import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CatalogFilters } from "@/shered/shered.types";

export class CatalogRepository {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    baseQuery() {
        return this.supra
            .from("products")
            .select("*", { count: "exact" });
    }

    async execute(query: any) {
        const { data, count, error } = await query;
        if (error) throw error;
        return { data, count };
    }

    applyFilters(query: any, filters: CatalogFilters) {
        // Search
        if (filters.search) {
            const terms = filters.search
                .toLowerCase()
                .split(" ")
                .filter(Boolean);

            for (const t of terms) {
                query = query.or(`
                        nome.ilike.%${t}%,
                        marca.ilike.%${t}%,
                        metaData->>sabor.ilike.%${t}%,
                        metaData->>intensidade.ilike.%${t}%,
                        metaData->>cor.ilike.%${t}%,
                        metaData->>tamanho.ilike.%${t}%,
                        metaData->>tipo.ilike.%${t}%,
                        metaData->>kit.ilike.%${t}%,
                        metaData->>mix.ilike.%${t}%`
                );
            }
        }

        // Marca
        if (filters.marca?.length) {
            query = query.in("marca", filters.marca);
        }

        // Tipo
        if (filters.tipo?.length) {
            query = query.in("tipo", filters.tipo);
        }

        // MetaData dinâmica
        if (filters.meta) {
            for (const key of Object.keys(filters.meta)) {
                const value = filters.meta[key as keyof typeof filters.meta];

                // FILTRO DE LISTA -> gera múltiplos ILIKE
                if (Array.isArray(value)) {

                    const conditions = value
                        .map(v => `${`metaData->>${key}`}.ilike.%${v}%`)
                        .join(",");

                    query = query.or(conditions);
                }

                // Valor único -> ILIKE padrão
                else if (typeof value === "string") {
                    query = query.ilike(`metaData->>${key}`, `%${value}%`);
                }

                // Numérico / boolean
                else {
                    query = query.eq(`metaData->>${key}`, value);
                }
            }
        }

        // Preço
        if (filters.precoMin !== undefined) query = query.gte("valor", filters.precoMin);
        if (filters.precoMax !== undefined) query = query.lte("valor", filters.precoMax);

        return query;
    }
}
