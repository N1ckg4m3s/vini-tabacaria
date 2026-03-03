import { ProdutoSemID } from "@/shered/shered.types";
import { ProductRepository } from "./products.repository";

export class ProductService {
    private repo = new ProductRepository();

    async createProduct(product: ProdutoSemID) {
        let p = { ...product }

        const hasSabor = typeof product.metadata.sabor === 'string'
        if (hasSabor) {
            const sabores = (product.metadata.sabor as string).split(',')
            p.metadata['mix'] = sabores.length >= 2
            p.metadata['sabor'] = sabores.map(s => s.toLowerCase().trim())
        }

        const repoResponse = await this.repo.create(p)

        return repoResponse;
    }

    async updateProduct(id: string, product: ProdutoSemID) {
        const repoResponse = await this.repo.update(id, product)
        return repoResponse;

    }

    async deleteProduct(id: string) {
        const repoResponse = await this.repo.delete(id)
        return repoResponse;
    }
}