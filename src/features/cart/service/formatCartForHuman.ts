import { CartProduto } from "@/shered/shered.types";

export const formatProdForHuman = (prod: CartProduto): string => {
    switch (prod.produto.tipo) {
        case 'aluminio':
        case 'carvao': return formatCarvaoAluminio(prod)
        case 'essencia': return formatEssencia(prod);
        case 'acessorio': return formaAcessorio(prod)
        default: return formatEssencia(prod);
    }
}

const obterBases = (p: CartProduto) => {
    const quantidade = p.quantidade
    const marca = p.produto.marca
    const nome = p.produto.nome

    return { quantidade, nome, marca }
}

const formatEssencia = (p: CartProduto): string => {
    const { quantidade, nome, marca } = obterBases(p)
    return `${quantidade}x ${marca} - ${nome}`;
}

const formaAcessorio = (p: CartProduto): string => {
    const { quantidade, nome, marca } = obterBases(p)
    const { cor, tamanho } = p.produto.metadata ?? {}

    const specs = [cor, tamanho].filter(Boolean).join(', ')

    return specs
        ? `${quantidade}x ${marca} - ${nome} (${specs})`
        : `${quantidade}x ${marca} - ${nome}`
}

const formatCarvaoAluminio = (p: CartProduto): string => {
    const { quantidade, nome, marca } = obterBases(p)
    const { kit } = p.produto.metadata ?? {}

    const specs = [kit].filter(Boolean).join(', ')

    return specs
        ? `${quantidade}x ${marca} - ${nome} (${specs})`
        : `${quantidade}x ${marca} - ${nome}`
}