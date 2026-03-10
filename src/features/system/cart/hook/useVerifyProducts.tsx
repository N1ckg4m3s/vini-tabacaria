import { CartProduto, Produto } from "@/shered/shered.types"
import { paramsToVerifyProducts } from "../service/paramsToVerify.service"
import { verifyCartApi } from "../api/verifyCartApi"
import { setStatusOnProduct } from "../service/setStatusOnProduct"

export const useVerifyProducts = () => {

    const verifyProducts = async (products: CartProduto[]): Promise<CartProduto[]> => {
        if (products.length === 0) return [] // Se não tiver produtos, salvos não precisa de verificar

        const ParamsToVerification = products.map(p => paramsToVerifyProducts(p.produto))

        const ProductsWithStatus = await verifyCartApi({ products: ParamsToVerification })

        return setStatusOnProduct(products, ProductsWithStatus)
    }

    return { verifyProducts }
}