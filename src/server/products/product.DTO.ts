import { BadRequestError } from "@/http/error/erros.handle";
import { Produto } from "@/shered/shered.types"
import { validateMetadata } from "./metadata/validator";

export const productDTOWithoutID = (formData: any): Omit<Produto, 'id'> => {
    if (!formData.get("marca")) throw new BadRequestError("Marca não informada");
    if (!formData.get("nome")) throw new BadRequestError("Nome não informado");
    if (!formData.get("tipo")) throw new BadRequestError("Tipo não informado");

    if (formData.get("metadata")) validateMetadata(formData.get("tipo"), JSON.parse(formData.get("metadata")));

    return {
        nome: formData.get("nome") as string || '',
        tipo: formData.get("tipo") as string || '',
        marca: formData.get("marca") as string || '',
        metadata: JSON.parse(formData.get("metadata")) || {},
        valor: Number(formData.get("valor") as string) || 0,
        imagem: formData.get("imagem") as File || null,
    }
}