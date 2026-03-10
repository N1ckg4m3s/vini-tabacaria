import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CatalogFilters, ProdutoSemID } from "@/shered/shered.types";
import { NoResponseError } from "@/http/error/erros.handle";

export class ProductRepository {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    baseQuery() {
        return this.supra
            .from("products")
            .select("*", { count: "exact" })
            .eq('visible', true);
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

    applySearch(query: any, search?: string) {
        if (!search?.trim()) return query;

        const term = `%${search}%`;

        return query.or(
            `nome.ilike.${term},marca.ilike.${term},tipo.ilike.${term}`
        );
    }

    async create(product: ProdutoSemID) {
        const { data, error } = await this.supra.from("products")
            .insert([product])
            .select();
        console.log({ data, error })

        if (error) throw error;
        if (!data) throw new NoResponseError('Não gerou resposta');
        return data[0];
    }

    async update(id: string, product: Partial<ProdutoSemID>) {
        const { data, error } = await this.supra.from("products")
            .update(product)
            .eq("id", id)
            .select();
        if (error) throw error;
        if (!data) throw new NoResponseError('Não gerou resposta');
        return data[0];
    }

    async delete(id: string) {
        const { data, error } = await this.supra.from("products")
            .update({ visible: false })
            .eq("id", id)
            .select();
        if (error) throw error;
        if (!data) throw new NoResponseError('Não gerou resposta');
        return data[0];
    }

    async findByIds(ids: string[]) {
        const { data, error } = await this.supra.from("products")
            .select("*")
            .in("id", ids)
        if (error) throw error;
        return data || [];
    }
}
