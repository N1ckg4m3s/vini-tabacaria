import { NoResponseError } from "@/http/error/erros.handle"
import { CartProduto } from "@/shered/shered.types"
import { apiCaller } from "@/features/_shered/services/apiCaller"

export const saveOrder = async (produtos: CartProduto[]) => {
    const request = await apiCaller({
        url: '/api/order',
        method: 'POST',
        body: { produtos }
    })

    if (!request) throw new NoResponseError()

    return request
}