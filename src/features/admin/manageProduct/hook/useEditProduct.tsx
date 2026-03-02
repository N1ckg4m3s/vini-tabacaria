import { useEffect, useState } from "react"
import { useEditProduct_Props } from "../types/hooks.type"
import { Produto } from "@/shered/shered.types"
import { useObterProdutoPorId } from "@/features/_shered/hooks/useObterProdutoPorId";

export const useEditProduct: useEditProduct_Props = ({ id }) => {
    const initialState: Produto = {
        id: "",
        marca: "",
        metadata: {},
        nome: "",
        tipo: "",
        valor: 0,
        imagem: ""
    }

    const [draft, setDraft] = useState<Produto>(initialState)
    const { product, loading } = useObterProdutoPorId({ id })

    useEffect(() => {
        if (product) setDraft(product)
    }, [product])

    const onChange = (newDraft: Produto) => setDraft(newDraft)

    return { loading, draft, onChange }
}
