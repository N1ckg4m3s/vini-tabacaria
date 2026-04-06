import { Produto } from "@/shered/shered.types";
import { formatMetadataValue } from "../services/formaters/meta.formater";

export const obterInformacoesDoProduto = (produto: Produto) => {
    const marca = produto.marca ?? '';
    const nome = produto.nome ?? '';
    let titulo = '-//-';
    let especificacao: string = '';

    switch (produto.tipo) {
        case "essencia":
            titulo = `${marca} ${nome}`
            especificacao = formatMetadataValue(produto.metadata.sabor)
            break;
        case "acessorio":
            titulo = `${produto.metadata.tipo}`;
            especificacao = `${produto.metadata.cor} ${produto.metadata.tamanho}`;
            break;
        case "carvao":
        case "aluminio":
            titulo = marca;
            especificacao = nome;
            break;
        case "outros":
            titulo = produto.marca ?? '';
            especificacao = `${produto.metadata.tipo}`;
            break;
    }

    return { titulo, especificacao };
}