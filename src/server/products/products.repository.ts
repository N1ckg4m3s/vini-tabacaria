import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CatalogFilters, ProdutoSemID } from "../../shered/shered.types";
import { NoResponseError } from "../../http/error/erros.handle";


export class ProductRepository {
    private db: SupabaseClient;

    constructor() { this.db = suprabase }

    async findCatalog(filters: CatalogFilters, search?: string, page: number = 1, perPage: number = 20) {
        const { data, error } = await this.db.rpc("catalog_products", {
            p_tipos: filters.tipo,
            p_marcas: filters.marca,
            p_meta: filters.meta
        });

        if (error) throw error;

        let result = data ?? [];

        if (search?.trim()) {
            const term = search.toLowerCase();
            result = result.filter((p: any) =>
                p.nome.toLowerCase().includes(term) ||
                p.marca?.toLowerCase().includes(term) ||
                p.tipo.toLowerCase().includes(term)
            );
        }

        const count = result.length;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        return {
            data: result.slice(start, end),
            count
        };
    }

    async findFilters(filters: CatalogFilters) {
        const { data, error } = await this.db.rpc("catalog_filters", {
            p_tipos: filters.tipo ?? [],
            p_marcas: filters.marca ?? [],
        });

        if (error) throw error;

        return data ?? [];
    }

    async create(product: ProdutoSemID) {
        const { data, error } = await this.db
            .from("products")
            .insert(product)
            .select()
            .single();

        if (error) throw error;
        if (!data) throw new NoResponseError("Produto não retornado");

        return data;
    }

    async update(id: string, product: Partial<ProdutoSemID>) {
        const { data, error } = await this.db
            .from("products")
            .update(product)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        if (!data) throw new NoResponseError("Produto não retornado");

        return data;
    }

    async delete(id: string) {
        const { data, error } = await this.db
            .from("products")
            .update({ visible: false })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        if (!data) throw new NoResponseError("Produto não retornado");

        return data;
    }

    async findByIds(ids: string[]) {
        const { data, error } = await this.db
            .from("products")
            .select("*")
            .in("id", ids);

        if (error) throw error;

        return data ?? [];
    }
}

