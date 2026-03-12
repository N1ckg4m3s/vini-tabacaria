import { CartProduto } from "@/shered/shered.types"
import { verifyCartApiResponse } from "../types/api.type"

export const setStatusOnProduct = (productSavedOnLocalStorage: CartProduto[], productsWithValidStatus: verifyCartApiResponse[]): CartProduto[] => {
    const productsReValidated = productSavedOnLocalStorage.map(productOnLocalStorage => {
        const productWithValidStatus = productsWithValidStatus.find(p => p.id === productOnLocalStorage.produto.id)

        if (productWithValidStatus) {

            console.log(productWithValidStatus)

            return {
                ...productOnLocalStorage, // Copia os dados do 'localStorage'
                produto: {
                    ...productOnLocalStorage.produto, // Copia os dados do produto original
                    ...productWithValidStatus, // Sobrescreve com os dados do backend (incluindo o status)
                },
                status: {
                    type: productWithValidStatus.status,
                    metadata: {
                        newPrice: productWithValidStatus.newPrice,
                        oldPrice: productWithValidStatus.oldPrice
                    }
                }, // Atualiza o status com o valor do backend
            }
        }

        // Se não encontrar o produto na resposta do backend, mantém o status original
        return productOnLocalStorage
    })

    return productsReValidated
}