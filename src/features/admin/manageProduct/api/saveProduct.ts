import { apiCaller } from "@/features/_shered/services/apiCaller";
import { NoResponseError } from "@/http/error/erros.handle";
import { ProdutoSemID } from "@/shered/shered.types";

export const saveProduct = async (product: ProdutoSemID) => {
    const request = await apiCaller({
        url: '/api/admin/product',
        method: 'POST',
        body: product,
    })

    if (!request) throw new NoResponseError();

    return request
};