import { NextResponse } from "next/server";
import { ProductRepository } from "../products/products.repository";
import { CatalogFilters, Produto } from "@/shered/shered.types";

const toArray = (v?: string | string[]): string[] =>
    Array.isArray(v) ? v : v ? [v] : []

export class ProductInfoService {
    private repo = new ProductRepository();

    private async obterProdutoPorId(productId: string) {
        const data = await this.repo.findByIds([productId]);

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

        const metaFilter: CatalogFilters = {}

        switch (produtoBase.tipo) {
            case "essencia":
                const sabores = toArray(produtoBase.metadata.sabor as string | string[] | undefined)
                const intensidades = toArray(produtoBase.metadata?.intensidade as string | string[] | undefined)

                metaFilter.meta = {
                    intensidade: intensidades,
                    sabor: sabores
                }
                break;

            case "acessorio":
                metaFilter.meta = {
                    tipo: toArray(produtoBase.metadata?.tipo as string | string[] | undefined),
                    tamanho: toArray(produtoBase.metadata?.tamanho as string | string[] | undefined),
                    cor: toArray(produtoBase.metadata?.cor as string | string[] | undefined)
                }
                break;
        }

        const { data } = await this.repo.findCatalog(metaFilter)

        return data;
    }

    obterItensPorMarca = async (params: { productId: string }) => {
        const { productId } = params

        const produtoBase: Produto = await this.obterProdutoPorId(productId)

        const { data } = await this.repo.findCatalog({
            marca: [produtoBase.marca],
            tipo: [produtoBase.tipo]
        })

        return data;
    }
}