import { ProdutoSemID } from "../../../../shered/shered.types";

type OptionalID = ProdutoSemID & { id?: string }

export const transformDraftToFormData = (draft: OptionalID): FormData => {
    const formData = new FormData();

    formData.append("nome", draft.nome);
    formData.append("tipo", draft.tipo);
    formData.append("marca", draft.marca);
    formData.append("valor", String(draft.valor));
    formData.append("metadata", JSON.stringify(draft.metadata));
    if (draft.imagem) formData.append("imagem", draft.imagem);
    if (draft.id) formData.append("id", draft.id);

    return formData;
}