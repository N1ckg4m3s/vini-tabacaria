'use client'
import CarrinhoCardItemComponent from '@/components/Cards/carrinho-item-card/CarrinhoCardItem';
import * as s from './style'
import NotificationContainerComponent from "@/components/CarrinhoComponents/notification-container/notification";
/**
 * Essa pagina exibe o conteúdo do carrinho de compras, incluindo:
 * - Lista de itens no carrinho
 * - Quantidade de cada item
 * - Preço total da compra
 * 
 * Ele pode ser expandido para incluir funcionalidades como:
 * - Remoção de itens
 * - Alteração de quantidade
 * - Finalização de compra
 * 
*/

import { ContainerPagina, HorizontalLine } from "@/styles/mixins";

const CarrinhoCompras = () => {
    return (
        <ContainerPagina $Column $Center>
            <NotificationContainerComponent
                tipoAviso={'Warning'}
                description={'No momento, o carrinho de compras é apenas para cotação de valores, ' +
                    'ao final da pagina tem um botão que envia o pedido direto para o WhatsApp da loja'}
            />

            <HorizontalLine />

            <s.CartProdutsContainer>
                {Array.from({ length: 10 }).map((v, i) => (
                    <CarrinhoCardItemComponent
                        key={i}
                        Quantidade={1}
                        Titulo='Ziggy Mix'
                        ValorUnitario={10}
                        Especificacao='Morango com laranja'
                    />
                ))}
            </s.CartProdutsContainer>

            <HorizontalLine />

            <NotificationContainerComponent
                tipoAviso={'Observation'}
                description={'O valor indicado como #### está sujeito a variações de preço conforme a forma de pagamento escolhida.'}
            />
        </ContainerPagina>
    );
};

export default CarrinhoCompras;
