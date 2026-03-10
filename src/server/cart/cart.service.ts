import { ProductWithStatus, Produto } from "@/shered/shered.types";

export class CartService {
    verifyDiferrences(productsOnDataBase: any[], productsToComparate: Partial<Produto>[]): ProductWithStatus[] {

        // status: valid | out_of_stock | price_changed
        return productsOnDataBase.map((p: any) => {
            // prioridade 1 (out_of_stock)
            if (!p.visible) return { ...p, status: 'out_of_stock' }

            const productToCompare = productsToComparate.find(PTC => PTC?.id === p.id);

            if (productToCompare) {
                // prioridade 2 (price_changed)
                if (p.valor !== productToCompare.valor) return { ...p, status: 'price_changed' }

                // Adicionais de validação
            }

            // Produto valido e sem alterações
            return { ...p, status: 'valid' }
        })
    }
}