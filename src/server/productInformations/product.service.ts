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

        query = this.repo.applyHardFilters(query, { tipo: [produtoBase.tipo] })

        query = query.limit(50)

        if (produtoBase.tipo === "essencia") {

            console.log({ sabores: produtoBase.metadata.sabor, intensidades: produtoBase.metadata?.intensidade })

            const sabores = toArray(produtoBase.metadata.sabor as string | string[] | undefined)
            const intensidades = toArray(produtoBase.metadata?.intensidade as string | string[] | undefined)

            query = this.repo.applyFilters(query, {
                meta: {
                    sabor: sabores,
                    intensidade: intensidades,
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

        const { data } = await this.repo.execute(query)

        return data;
    }

    obterItensPorMarca = async (params: { productId: string }) => {
        const { productId } = params

        const produtoBase: Produto = await this.obterProdutoPorId(productId)

        let query = this.repo.baseQuery()
            .neq("id", produtoBase.id)

        query = this.repo.applyHardFilters(query, {
            marca: toArray(produtoBase.marca),
            tipo: toArray(produtoBase.tipo)
        })

        const { data } = await this.repo.execute(query)

        return data;
    }
}