import { useState } from "react"
import { saveProduct } from "../api/saveProduct"
import { ProdutoSemID } from "@/shered/shered.types"
import { useNotification } from "@/providers/notification.provider"
import { updateProduct } from "../api/updateProduct"

export const useSave = ({ resetDraft }: { resetDraft: () => void }) => {
    const { adicionarNotificacao } = useNotification()
    const [loading, setLoading] = useState(false)
    const save = async (product: ProdutoSemID, productId?: string) => {
        try {
            setLoading(true)

            let response;

            if (productId) {
                response = await updateProduct(productId, product);
            } else {
                response = await saveProduct(product);
                resetDraft();
            }

            adicionarNotificacao({
                title: 'Produto salvo',
                message: 'O produto foi salvo com sucesso.',
                type: 'Success',
            })

            return response;
        } catch (error) {
            adicionarNotificacao({
                title: 'Erro ao salvar produto',
                message: 'Ocorreu um erro ao salvar o produto. Por favor, tente novamente.',
                type: 'Error',
            })
        } finally {
            setLoading(false)
        }
    }
    return { save, loading }
}