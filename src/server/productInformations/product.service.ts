import { NextResponse } from "next/server";
import { ProductRepository } from "../products/products.repository";
import { Produto } from "@/shered/shered.types";

const toArray = (v?: string | string[]): string[] =>
    Array.isArray(v) ? v : v ? [v] : []

export class ProductInfoService {
    private repo = new ProductRepository();

    private async obterProdutoPorId(productId: string) {
        const query = this.repo.baseQuery().eq("id", productId);
        const { data } = await this.repo.execute(query);

        if (!data?.length) {
            throw new Error("Produto não encontrado");
        }

        return data[0];
    }

    obterItemPorID = async (params: { productId: string }) => {
        const { productId } = params

        return await this.obterProdutoPorId(productId)
    }

    obterItensPorRelevancia = async (params: { productId: string }) => {
        const { productId } = params

        const produtoBase: Produto = await this.obterProdutoPorId(productId)

        let query = this.repo.baseQuery()
            .neq("id", produtoBase.id)
            .eq("tipo", produtoBase.tipo)
            .limit(100)

        if (produtoBase.tipo === "essencia") {
            query = this.repo.applyFilters(query, {
                meta: {
                    sabor: toArray(produtoBase.metadata.sabor as string | string[] | undefined),
                    intensidade: toArray(produtoBase.metadata?.intensidade as string | string[] | undefined),
                }
            })
        }

        if (produtoBase.tipo === "acessorio") {
            query = this.repo.applyFilters(query, {
                meta: {
                    tipo: toArray(produtoBase.metadata?.tipo as string | string[] | undefined),
                    tamanho: toArray(produtoBase.metadata?.tamanho as string | string[] | undefined),
                    cor: toArray(produtoBase.metadata?.cor as string | string[] | undefined)
                }
            })
        }
        try {
            return NextResponse.json({}, { status: 200 });
        } catch (e) {
            console.error(e);
            return NextResponse.json({ error: `Erro interno no servidor mensagem: ${e}` }, { status: 500 });
        }
    }

    obterItensPorMarca = async (params: { productId: string }) => {
        const { productId } = params

        const produtoBase: Produto = await this.obterProdutoPorId(productId)

        let query = this.repo.baseQuery()

        query = this.repo.applyHardFilters(query, {
            marca: toArray(produtoBase.marca),
            tipo: toArray(produtoBase.tipo)
        })
        try {
            return NextResponse.json({}, { status: 200 });
        } catch (e) {
            console.error(e);
            return NextResponse.json({ error: `Erro interno no servidor mensagem: ${e}` }, { status: 500 });
        }
    }
}