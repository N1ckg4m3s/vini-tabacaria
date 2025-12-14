import { Produto } from "@/shered/shered.types";

export const obterInformacoesDoProduto = (produto: Produto) => {
    const marca = produto.marca ?? '';
    const nome = produto.nome ?? '';
    let titulo = '-//-';
    let especificacao: any;

    switch (produto.tipo) {
        case "essencia":
            titulo = `${marca} ${nome}`
            especificacao = produto.metadata.sabor
            break;
        case "acessorio":
            titulo = `${produto.metadata.tipo}`;
            especificacao = `${produto.metadata.cor} ${produto.metadata.tamanho}`;
            break;
        case "carvaoAluminio":
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