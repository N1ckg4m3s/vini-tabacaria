'use client'
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg'
import SetaIcon from './setaIcon';
import { getPaginasVisiveis } from './paginasVisiveis_aux';
import { Theme } from '@/styles/theme';

interface props {
    numeroDePaginas: number,
    paginaAtual: number,
    changeTo: (page: number) => void
}

/**
 * Componente para paginação do catalogo.
 * 
 * @param {number} numeroDePaginas - Quantidade maxima de paginas que tem no catalogo.
 * @param {number} paginaAtual - Pagina atual do usuario.
 * @param {function} changeTo - Pagina que o catalogo precisa mostra o conteudo.
 * 
 * @component
 * @returns {JSX.Element}
*/
const PaginacaoComponente: React.FC<props> = ({ numeroDePaginas, paginaAtual, changeTo }) => {
    /* Obtem o valor das paginas que vão estar visiveis no componente de paginação */
    const paginas = getPaginasVisiveis({ paginaAtual, numeroDePaginas })

    /* Sem retorno caso não seja necessario paginação */
    if (numeroDePaginas <= 1) return <></>

    return <s.PaginacaoContainer>
        {/* Botão Voltar */}
        <s.BotaoModificacaoPagina
            onClick={() => changeTo(paginaAtual - 1)}
            disabled={paginaAtual === 1}
        >
            <SetaIcon direction='left' />
        </s.BotaoModificacaoPagina>

        {/* Páginas dinâmicas */}
        {paginas.map((pagina, index) => {
            if (pagina === 'ellipsis') {
                return (
                    <s.RetisenciasContainer key={`ellipsis-${index}`}>
                        <s.Reticencia />
                    </s.RetisenciasContainer>
                );
            }

            const isAtual = pagina === paginaAtual;

            return (
                <s.BotaoModificacaoPagina
                    key={pagina}
                    onClick={() => changeTo(pagina)}
                    disabled={isAtual}
                    $ePaginaAtual={isAtual}>
                    {pagina}
                </s.BotaoModificacaoPagina>
            );
        })}

        {/* Botão Avançar */}
        <s.BotaoModificacaoPagina
            onClick={() => changeTo(paginaAtual + 1)}
            disabled={paginaAtual === numeroDePaginas}
        >
            <SetaIcon direction="right" />
        </s.BotaoModificacaoPagina>

    </s.PaginacaoContainer>
};

export default PaginacaoComponente;