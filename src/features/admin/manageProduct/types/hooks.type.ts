import { Produto } from "@/shered/shered.types"
// ------------------------
// use edit product
// ------------------------
type useEditProduct_Params = { id?: string }
type useEditProduct_Respose = {
    loading: boolean,
    draft: Produto,
    onChange: (newDraft: Produto) => void
    resetDraft: () => void
}

export type useEditProduct_Props = (params: useEditProduct_Params) => useEditProduct_Respose