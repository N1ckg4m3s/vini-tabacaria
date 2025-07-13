import Link from 'next/link';

/**
 * Esta página exibe um erro ao não encontrar a pagina solicitada
 * 
 * deixando disponibilizado para o usuario retornar para a pagina inicial
 * 
 * Ele pode ser expandido para incluir funcionalidades como:
 *  - permitir voltar para a pagina anterior do erro
*/

/* Meta data para modificação do titulo da pagina (não funciona dentro de 'use client')
    export const metadata = {
        title: '[TITULO DA PAGINA]', 
    }
*/

const ErrorPage = () => {
    return (
        <div>
            <h1>404 - Página Não Encontrada</h1>
            <p>
                A página que você está procurando não existe. Volte para a página inicial.
            </p>
            <Link href="/catalogo">
                Voltar para a Página Inicial
            </Link>
        </div>
    );

}

export default ErrorPage;
