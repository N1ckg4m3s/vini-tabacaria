import { ProdutoSemID } from "@/shered/shered.types";
import { ProductRepository } from "./products.repository";

export class ProductService {
    private repo = new ProductRepository();

    private async formatMeta(product: ProdutoSemID): Promise<Record<string, string | number | boolean | string[] | number[]>> {
        const metadata = { ...product.metadata }

        if (typeof metadata.sabor === 'string') {
            const sabores = (metadata.sabor as string)
                .split(/[,\s]+/)
                .map(s => s.toLowerCase().trim())
                .filter(Boolean)
            metadata['mix'] = sabores.length >= 2
            metadata['sabor'] = sabores
        }

        return metadata
    }

    async createProduct(product: ProdutoSemID) {
        const metadata = await this.formatMeta(product)
        const repoResponse = await this.repo.create({ ...product, metadata })
        return repoResponse
    }

    async updateProduct(id: string, product: ProdutoSemID) {
        const metadata = await this.formatMeta(product)
        const repoResponse = await this.repo.update(id, { ...product, metadata })
        return repoResponse;

    }

    async deleteProduct(id: string) {
        const repoResponse = await this.repo.delete(id)
        return repoResponse;
    }

    async getProductsByIds(productsId: string[]) {
        const products = await this.repo.findByIds(productsId)
        return products;
    }
}