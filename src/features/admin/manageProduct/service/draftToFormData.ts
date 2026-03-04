export const transformDraftToFormData = (draft: any): FormData => {
    const formData = new FormData();

    formData.append("nome", draft.nome);
    formData.append("tipo", draft.tipo);
    formData.append("marca", draft.marca);
    formData.append("valor", String(draft.valor));
    formData.append("metadata", JSON.stringify(draft.metadata));
    formData.append("imagem", draft.imagem);
    formData.append("id", draft.id);

    return formData;
}