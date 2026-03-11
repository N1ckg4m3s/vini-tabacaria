import { CatalogFilters } from "@/shered/shered.types";
import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";

export class filterRepository {
    private db: SupabaseClient;

    constructor() { this.db = suprabase }

    async findFilters(filters: CatalogFilters) {
        const { data, error } = await this.db.rpc("catalog_filters", {
            p_tipos: filters.tipo ?? [],
            p_marcas: filters.marca ?? [],
        });

        if (error) throw error;

        return data ?? [];
    }
}