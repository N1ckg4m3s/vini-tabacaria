import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CatalogFilters } from "@/shered/shered.types";

export class ProductRepository {
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
        if (filters.meta) {
            for (const key of Object.keys(filters.meta)) {
                const value = filters.meta[key as keyof typeof filters.meta];

                if (Array.isArray(value)) {
                    const conditions = value
                        .map(v => `${`metadata->>${key}`}.ilike.%${v}%`)
                        .join(",");

                    query = query.or(conditions);
                }

                else if (typeof value === "string") {
                    query = query.ilike(`metadata->>${key}`, `%${value}%`);
                }

                else {
                    query = query.eq(`metadata->>${key}`, value);
                }
            }
        }
        return query;
    }

    applyHardFilters(query: any, filters: CatalogFilters) {
        if (filters.marca?.length) {
            query = query.in("marca", filters.marca);
        }

        if (filters.tipo?.length) {
            query = query.in("tipo", filters.tipo);
        }

        if (filters.precoMin !== undefined) query = query.gte("valor", filters.precoMin);
        if (filters.precoMax !== undefined) query = query.lte("valor", filters.precoMax);
        return query;
    }
}
