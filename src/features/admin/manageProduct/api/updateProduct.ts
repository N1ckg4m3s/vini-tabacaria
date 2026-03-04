import { apiCaller } from "@/features/_shered/services/apiCaller";
import { NoResponseError } from "@/http/error/erros.handle";

export const updateProduct = async (id: string, product: FormData) => {
    const request = await apiCaller({
        url: `/api/admin/product?id=${id}`,
        method: 'PUT',
        body: product,
    });

    if (!request) throw new NoResponseError()

    return request
};