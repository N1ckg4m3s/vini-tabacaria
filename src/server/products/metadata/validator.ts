import { BadRequestError } from "@/http/error/erros.handle";
import { metadataValidators } from "./validatorParams";

export function validateMetadata(tipo: string, metadata: Record<string, any>) {
    const validators = metadataValidators[tipo];
    if (!validators) throw new BadRequestError(`Tipo inválido: ${tipo}`);

    for (const key of Object.keys(validators)) {
        const type = validators[key];
        const value = metadata[key];

        if (value === undefined || value === null)
            throw new BadRequestError(`Campo obrigatório faltando: ${key}`);

        switch (type) {
            case 'text':
                if (typeof value !== 'string') throw new BadRequestError(`${key} deve ser string`);
                break;
            case 'number':
                if (typeof value !== 'number') throw new BadRequestError(`${key} deve ser number`);
                break;
            case 'checkbox':
            case 'select':
                if (!Array.isArray(value)) throw new BadRequestError(`${key} deve ser array`);
                break;
        }
    }

    return true; // ok
}
