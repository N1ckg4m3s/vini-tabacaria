import { useState } from "react"
import { saveProduct } from "../api/saveProduct"
import { updateProduct } from "../api/updateProduct"
import { transformDraftToFormData } from "../service/draftToFormData"
import { ProdutoSemID } from "@/shered/shered.types"
import { useNotification } from "@/providers/notification.provider"

export const useSave = ({ resetDraft }: { resetDraft: () => void }) => {
    const { adicionarNotificacao } = useNotification()
    const [loading, setLoading] = useState(false)
    const save = async (product: ProdutoSemID, productId?: string) => {
        try {
            setLoading(true)

            const formData = transformDraftToFormData(product)
            let response;

            if (productId) {
                response = await updateProduct(productId, formData);
            } else {
                response = await saveProduct(formData);
                resetDraft();
            }

            adicionarNotificacao({
                title: 'Produto salvo',
                message: 'O produto foi salvo com sucesso.',
                type: 'Success',
            })

            return response;
        } catch (error: unknown) {
            if (error instanceof Error)
                adicionarNotificacao({
                    title: 'Erro ao salvar produto',
                    message: error?.message,
                    type: 'Error',
                })
        } finally {
            setLoading(false)
        }
    }
    return { save, loading }
}