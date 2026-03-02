import { extractUniqueStrings, rankProducts } from "./catalog.helpers";
import { CatalogFilters, Produto } from "@/shered/shered.types";
import { ProductRepository } from "../products/products.repository";

export class catalogService {
    private repo = new ProductRepository();

    async obterItensPorPagina(params: { page: number; perPage: number; filters: any; search?: string }) {
        const { page, perPage, filters, search } = params;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        let query = this.repo.baseQuery();
        query = this.repo.applyHardFilters(query, filters);
        query = this.repo.applyFilters(query, filters);
        query = this.repo.applySearch(query, search)
        query = query.limit(100);

        const { data, count } = await this.repo.execute(query);

        const ranked = rankProducts(data, filters);
        const pageItems = ranked.slice(start, end);

        return {
            itens: pageItems,
            total: count,
            page,
            perPage
        };
    }

    obterDadosParaFiltragem = async (params: { filters: CatalogFilters }) => {
        const { filters } = params

        let query = this.repo.baseQuery()

        const { data } = await this.repo.execute(query);

        let produtos = [...data];
        /* ==================== [filtros hierarquicos] ==================== */
        // ========== 1️⃣ obtem todos os tipos de produto
        const tipos = extractUniqueStrings(produtos, p => p.tipo)

        // Aplica filtragem nos items para ter apenas os 'tipos selecionados'
        if (filters.tipo && filters.tipo.length > 0) {
            produtos = produtos.filter((p: Produto) => filters.tipo?.includes(p.tipo))
        }

        // ========== 2️⃣ obtem todos as marcas
        const marcas = extractUniqueStrings(produtos, p => p.marca)

        // Aplica filtragem nos items para ter apenas as 'marcas selecionados'
        if (filters.marca && filters.marca?.length > 0) produtos = produtos.filter((p: Produto) => filters.marca?.includes(p.marca))

        // Compatibilidade com as metas.
        const precoMin = Math.min(...produtos.map((p: Produto) => p.valor || Infinity));
        const precoMax = Math.max(...produtos.map((p: Produto) => p.valor || -Infinity));

        // Essência
        const sabores = extractUniqueStrings(produtos, p => p.metadata?.sabor);
        const intensidades = extractUniqueStrings(produtos, p => p.metadata?.intensidade);

        // Acessórios
        const cores = extractUniqueStrings(produtos, p => p.metadata?.cor);
        const tamanhos = extractUniqueStrings(produtos, p => p.metadata?.tamanho);
        const metaTipos = extractUniqueStrings(produtos, p => p.metadata?.tipo);

        // Carvão / Alumínio
        const pacotes = extractUniqueStrings(produtos, p => p.metadata?.pacote);

        return {
            filtros: {
                marca: marcas,
                tipo: tipos,

                essencia: {
                    sabor: sabores,
                    intensidade: intensidades,
                },

                acessorio: {
                    cor: cores,
                    tamanho: tamanhos,
                    tipo: metaTipos,
                },

                carvao_aluminio: {
                    pacote: pacotes,
                },

                preco: {
                    min: Number.isFinite(precoMin) ? precoMin : 0,
                    max: Number.isFinite(precoMax) ? precoMax : 0,
                },
            }
        }
    };
}