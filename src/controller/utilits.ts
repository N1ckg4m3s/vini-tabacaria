import { Produto, ProdutoAcessorio, ProdutoCarvaoAluminio, ProdutoEssencia, ProdutoOutros } from "./types";

/**
 * Valida se um texto passado é um email
 * 
 * @param {string} email - Texto a ser validado como e-mail.
 * @returns {boolean} `true` se for um e-mail válido, `false` caso contrário.
*/
export default function validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

/** type guards **/

/**
 * verifica se o produto é do tipo Essência 
 * 
 * @param produto Produto a ser verificado
 * @returns 
*/
export function isProdutoEssencia(produto: Produto): produto is ProdutoEssencia {
    return produto.tipo === 'essencia';
}

/**
 * verifica se o produto é do tipo Acessório
 * 
 * @param produto Produto a ser verificado
 * @returns
*/
export function isProdutoAcessorio(produto: Produto): produto is ProdutoAcessorio {
    return produto.tipo === 'acessorio';
}

/**
 * verifica se o produto é do tipo Carvão/Alumínio
 * 
 * @param produto Produto a ser verificado
 * @returns
*/
export function isProdutoCarvaoAluminio(produto: Produto): produto is ProdutoCarvaoAluminio {
    return produto.tipo === 'carvaoAluminio';
}


/**
 * verifica se o produto é do tipo 'outros'
 * 
 * @param produto Produto a ser verificado
 * @returns
*/
export function isProdutoOutros(produto: Produto): produto is ProdutoOutros {
    return produto.tipo === 'outros';
}