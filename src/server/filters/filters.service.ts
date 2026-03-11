import { CatalogFilters } from "@/shered/shered.types";
import { filterRepository } from "./filters.repository";

export class filterService {
    private repo = new filterRepository();

    constructor() { }

    obterDadosParaFiltragem = async (params: { filters: CatalogFilters }) => {
        console.time('query')
        const { filters } = params

        let produtos = await this.repo.findFilters(filters)

        const grouped = produtos.reduce((
            acc: { [x: string]: { value: any; count: any; }[]; },
            row: { key: string | number; value: any; count: any; }
        ) => {
            if (!acc[row.key]) {
                acc[row.key] = []
            }

            acc[row.key].push({
                value: row.value,
                count: row.count
            })

            return acc
        }, {})
        
        console.timeEnd('query')
        return grouped
    };
}

/*
    /* ==================== [filtros hierarquicos] ==================== * /
    // ========== 1️⃣ obtem todos os tipos de produto
    console.time('hierarquia 1')

    const tipos = extractUniqueStrings(produtos, p => p.tipo)

    // Aplica filtragem nos items para ter apenas os 'tipos selecionados'
    if (filters.tipo && filters.tipo.length > 0) {
        produtos = produtos.filter((p: Produto) => filters.tipo?.includes(p.tipo))
    }

    console.timeEnd('hierarquia 1')
    // ========== 2️⃣ obtem todos as marcas

    console.time('hierarquia 2')
    const marcas = extractUniqueStrings(produtos, p => p.marca)

    // Aplica filtragem nos items para ter apenas as 'marcas selecionados'
    if (filters.marca && filters.marca?.length > 0) produtos = produtos.filter((p: Produto) => filters.marca?.includes(p.marca))
    console.timeEnd('hierarquia 2')

    console.time('hierarquia 3')
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

    console.timeEnd('hierarquia 3')

    console.timeEnd('hole query')
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
*/