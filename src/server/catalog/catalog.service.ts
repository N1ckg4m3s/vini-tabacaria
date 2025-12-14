import { NextRequest, NextResponse } from "next/server";
import { CatalogRepository } from "./catalog.repository";
import { extractUniqueStrings, rankProducts } from "./catalog.helpers";
import { Produto } from "@/shered/shered.types";

export class catalogService {
    private repo = new CatalogRepository();

    obterItensPorPagina = async (request: NextRequest) => {
        try {
            const { searchParams } = request.nextUrl;

            const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
            const perPage = Math.max(parseInt(searchParams.get("limit_per_page") || "10"), 10);

            const filters = JSON.parse(searchParams.get("filters") || "{}");

            const start = (page - 1) * perPage;
            const end = start + perPage - 1;

            let query = this.repo.baseQuery();

            query = this.repo.applyFilters(query, filters);

            query = query.range(start, end);

            const { data, count } = await this.repo.execute(query);

            const ranked = rankProducts(data, filters);

            return NextResponse.json({
                itens: ranked,
                total: count,
                page,
                perPage
            }, { status: 200 }
            );
        } catch (e) {
            console.error(e);
            return NextResponse.json({ error: `Erro interno no servidor mensagem: ${e}` }, { status: 500 });
        }
    }

    obterDadosParaFiltragem = async (request: NextRequest) => {
        try {
            const query = this.repo.baseQuery()
            const { data: produtos, count } = await this.repo.execute(query);

            // Filtros bases [independende de meta]
            const marcas = extractUniqueStrings(produtos, p => p.marca)
            const tipos = extractUniqueStrings(produtos, p => p.tipo)

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

            return NextResponse.json({
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
            }, { status: 200 });

        } catch (error) {
            console.error("Erro ao obter filtros", error);
            return NextResponse.json({ error: "Erro ao obter filtros" }, { status: 500 });
        }
    };
}