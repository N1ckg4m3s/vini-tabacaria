import { Produto, ProdutoAcessorio, ProdutoBase, ProdutoCarvaoAluminio, ProdutoEssencia, ProdutoOutros } from "./types"

function mapProdutoBase(raw: any): ProdutoBase {
    return {
        id: raw.id,
        nome: raw.nome,
        marca: raw.marca,
        valor: Number(raw.valor),
        tipo: ''
    }
}

function mapProdutoEssencia(raw: any): ProdutoEssencia {
    const base: ProdutoBase = mapProdutoBase(raw);

    return {
        ...base,
        tipo: 'essencia',
        imagem: raw.imagem,
        especificacao: {
            sabor: raw.especificacao?.sabor ?? '',
            tipo: Array.isArray(raw.especificacao?.tipo)
                ? raw.especificacao.tipo.map(String)
                : [],
        },
    }
}

function mapProdutoAcessorio(raw: any): ProdutoAcessorio {
    const base: ProdutoBase = mapProdutoBase(raw);

    return {
        ...base,
        tipo: 'acessorio',
        imagem: raw.imagem,
        especificacao: {
            tipo: String(raw.especificacao?.tipo),
            cor: String(raw.especificacao?.cor),
            tamanho: String(raw.especificacao?.tamanho),
        },
    }
}

function mapProdutoCarvaoAluminio(raw: any): ProdutoCarvaoAluminio {
    const base: ProdutoBase = mapProdutoBase(raw);

    return {
        ...base,
        tipo: 'carvaoAluminio',
        imagem: raw.imagem,
        especificacao: {
            kit: String(raw.especificacao?.kit),
        },
    }
}

function mapProdutoOutros(raw: any): ProdutoOutros {
    const base: ProdutoBase = mapProdutoBase(raw);

    return {
        ...base,
        tipo: 'outros',
        imagem: raw.imagem,
        especificacao: raw.especificacao ?? {},
    }
}

export function mapProduto(raw: any): Produto {
    switch (raw.tipo) {
        case 'essencia':
            return mapProdutoEssencia(raw)
        case 'acessorio':
            return mapProdutoAcessorio(raw)
        case 'carvaoAluminio':
            return mapProdutoCarvaoAluminio(raw)
        case 'outros':
            return mapProdutoOutros(raw)
        default:
            throw new Error(`Tipo de produto desconhecido: ${raw.tipo}`)
    }
}