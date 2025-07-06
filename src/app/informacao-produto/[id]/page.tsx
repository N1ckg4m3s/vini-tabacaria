'use client';
import { useParams } from 'next/navigation';
import Head from 'next/head';

/**
 * Esta página exibe informações detalhadas do produto passado na URL, incluindo:
 * - Imagem
 * - Nome
 * - Especificações (nome, cor, etc.)
 * - Valor
 * - Possibilidade de adicionar no carrinho
 * 
 * Também pode mostrar:
 * - Itens semelhantes ou relacionados (com base na marca ou cor)
 * 
 * Funcionalidades possíveis de expansão:
 * - Modificar a quantidade do produto no carrinho, caso já tenha sido adicionado
 * - Remover do carrinho
 * 
 * @component
 * @param {string} id - O ID do produto a ser exibido.
 */

/* Meta data para modificação do titulo da pagina (não funciona dentro de 'use client')
    export const metadata = {
        title: '[TITULO DA PAGINA]', 
    }
*/

const InformacaoProduto = () => {
    const { id } = useParams();
    return (
        <>
            <Head>
                <title>Informações do Produto</title>
                <meta name="description" content={`Detalhes do produto.`} />
                <meta property="og:title" content={`Detalhes do produto`} />
                <meta property="og:description" content={`Veja todos os detalhes sobre o produto.`} />
            </Head>

            <h1>Informações do Produto: {id}</h1>
        </>
    );
};

export default InformacaoProduto;
