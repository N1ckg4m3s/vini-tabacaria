import { NoResponseError } from "@/http/error/erros.handle";
import { apiCaller } from "@/_shered/services/apiCaller";

export const updateProduct = async (id: string, product: FormData) => {
    const request = await apiCaller({
        url: `/api/admin/product?id=${id}`,
        method: 'PUT',
        body: product,
    });

    if (!request) throw new NoResponseError()

    return request
};