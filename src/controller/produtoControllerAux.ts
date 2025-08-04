import { Produto } from "./types";
import { isProdutoAcessorio, isProdutoCarvaoAluminio, isProdutoEssencia } from "./utilits";

/**
 * Função para obter o título e a especificação do produto com base no tipo.
 * @returns {titulo: string, especificacao: string}
 */
export const obterMarcaDoProduto = (itemData: Produto): string => {
    const produto = itemData as Produto;
    const marca = produto.marca ?? '';

    return marca;
};

export const obterInformacoesProduto = (itemData: Produto): { titulo: string; especificacao: string } => {
    const produto = itemData as Produto;
    const marca = produto.marca ?? '';
    const nome = produto.nome ?? '';
    let titulo = '-//-';
    let especificacao = '';

    if (isProdutoEssencia(itemData)) {
        titulo = `${marca} ${nome}`;
        especificacao = itemData.especificacao.sabor;
    } else if (isProdutoCarvaoAluminio(itemData)) {
        titulo = marca;
        especificacao = nome;
    } else if (isProdutoAcessorio(itemData)) {
        titulo = itemData.especificacao.tipo;
        especificacao = `${itemData.especificacao.cor} ${itemData.especificacao.tamanho}`;
    } else if (itemData.tipo === 'outros') {
        titulo = itemData.marca ?? '';
        especificacao = `${itemData.especificacao.tipo}`;
    }

    return { titulo, especificacao };
};