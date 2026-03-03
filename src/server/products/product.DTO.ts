import { BadRequestError } from "@/http/error/erros.handle";
import { Produto } from "@/shered/shered.types"
import { validateMetadata } from "./metadata/validator";

export const productDTOWithoutID = (body: any): Omit<Produto, 'id'> => {
    if (!body.marca) throw new BadRequestError("Marca não informada");
    if (!body.nome) throw new BadRequestError("Nome não informado");
    if (!body.tipo) throw new BadRequestError("Tipo não informado");

    if (body.metaData) validateMetadata(body.tipo, body.metadata);

    return {
        marca: body.marca.toLowerCase().trim(),
        nome: body.nome.toLowerCase().trim(),
        tipo: body.tipo.toLowerCase().trim(),
        valor: body.valor ?? 0,
        imagem: body.imagem ?? '',
        metadata: body.metadata ?? {}
    }
}