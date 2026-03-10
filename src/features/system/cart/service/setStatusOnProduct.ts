import { CartProduto, ProductWithStatus } from "@/shered/shered.types"

export const setStatusOnProduct = (productSavedOnLocalStorage: CartProduto[], productsWithValidStatus: ProductWithStatus[]): CartProduto[] => {
    const productsReValidated = productSavedOnLocalStorage.map(productOnLocalStorage => {
        const productWithValidStatus = productsWithValidStatus.find(p => p.id === productOnLocalStorage.produto.id)

        if (productWithValidStatus) {
            return {
                ...productOnLocalStorage, // Copia os dados do 'localStorage'
                produto: {
                    ...productOnLocalStorage.produto, // Copia os dados do produto original
                    ...productWithValidStatus, // Sobrescreve com os dados do backend (incluindo o status)
                },
                status: productWithValidStatus.status, // Atualiza o status com o valor do backend
            }
        }

        // Se não encontrar o produto na resposta do backend, mantém o status original
        return productOnLocalStorage
    })

    return productsReValidated
}