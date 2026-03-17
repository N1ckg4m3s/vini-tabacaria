import Link from 'next/link';
import { NotFoundPage } from '../features/system/notFount/pages/notFound.page';

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

export default function Page() {
    return <NotFoundPage />
}