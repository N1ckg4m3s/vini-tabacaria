import { Produto, ProdutoAcessorio, ProdutoBase, ProdutoCarvaoAluminio, ProdutoEssencia, ProdutoOutros } from "./types"

export function mapProdutoBase(raw: any, returnWithoutBase?: boolean): ProdutoBase | {} {
    return returnWithoutBase ? {
        id: raw.id,
        nome: raw.nome,
        marca: raw.marca,
        imagem: raw.imagem,
        valor: Number(raw.valor),
        tipo: ''
    } : {};
}

export function mapProdutoEssencia(raw: any, returnWithoutBase?: boolean): ProdutoEssencia {
    const base: ProdutoBase | {} = mapProdutoBase(raw, returnWithoutBase);

    return {
        ...base,
        tipo: 'essencia',
        especificacao: {
            sabor: raw.especificacao?.sabor ?? '',
            tipo: Array.isArray(raw.especificacao?.tipo)
                ? raw.especificacao.tipo.map(String)
                : [],
        },
    }
}

export function mapProdutoAcessorio(raw: any, returnWithoutBase?: boolean): ProdutoAcessorio {
    const base: ProdutoBase | {} = mapProdutoBase(raw, returnWithoutBase);

    return {
        ...base,
        tipo: 'acessorio',
        especificacao: {
            tipo: String(raw.especificacao?.tipo),
            cor: String(raw.especificacao?.cor),
            tamanho: String(raw.especificacao?.tamanho),
        },
    }
}

export function mapProdutoCarvaoAluminio(raw: any, returnWithoutBase?: boolean): ProdutoCarvaoAluminio {
    const base: ProdutoBase | {} = mapProdutoBase(raw, returnWithoutBase);


    return {
        ...base,
        tipo: 'carvaoAluminio',
        especificacao: {
            kit: String(raw.especificacao?.kit),
        },
    }
}

export function mapProdutoOutros(raw: any, returnWithoutBase?: boolean): ProdutoOutros {
    const base: ProdutoBase | {} = mapProdutoBase(raw, returnWithoutBase);

    return {
        ...base,
        tipo: 'outros',
        especificacao: raw.especificacao ?? {},
    }
}

export function mapProduto(raw: any, returnWithoutBase?: boolean): Produto {
    switch (raw.tipo) {
        case 'essencia':
            return mapProdutoEssencia(raw, returnWithoutBase)
        case 'acessorio':
            return mapProdutoAcessorio(raw, returnWithoutBase)
        case 'carvaoAluminio':
            return mapProdutoCarvaoAluminio(raw, returnWithoutBase)
        case 'outros':
            return mapProdutoOutros(raw, returnWithoutBase)
        default:
            throw new Error(`Tipo de produto desconhecido: ${raw.tipo}`)
    }
}