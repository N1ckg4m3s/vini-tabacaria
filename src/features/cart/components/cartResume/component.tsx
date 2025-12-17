import * as s from './style'

export const CartResume = () => {

    return (<>
        <s.SummaryContainer>
            <s.SummaryTitle>Resumo</s.SummaryTitle>
            <s.SummaryLine>
                <span>Subtotal</span>
                <span>R$: 10,00</span>
            </s.SummaryLine>

            <s.SummaryLine_Muted>
                <span>Entrega: </span>
                <span>- a combinar -</span>
            </s.SummaryLine_Muted>

            <s.SummaryTotal>
                <span>Total</span>
                <span>R$ 99,80</span>
            </s.SummaryTotal>

            <s.FinishButton>Finalizar compra</s.FinishButton>
        </s.SummaryContainer>
    </>)
}