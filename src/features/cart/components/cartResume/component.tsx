import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'

interface props {
    subTotal: number,
    entrega: number,
    total: number,
    finalizeTrigger: () => void
    limparCarrinho: () => void
}

export const CartResume: React.FC<props> = ({ entrega, subTotal, total, finalizeTrigger, limparCarrinho }) => {
    return (<>
        <s.SummaryContainer>
            <s.SummaryTitle>Resumo</s.SummaryTitle>
            <s.SummaryLine>
                <span>Subtotal</span>
                <span>${formatePrice(subTotal)}</span>
            </s.SummaryLine>

            <s.SummaryLine_Muted>
                <span>Entrega: </span>
                <span>- a combinar -</span>
            </s.SummaryLine_Muted>

            <s.SummaryTotal>
                <span>Total</span>
                <span>${formatePrice(total)}</span>
            </s.SummaryTotal>

            <s.ActionsButton>
                <s.FinishButton onClick={finalizeTrigger}>Enviar cotação</s.FinishButton>
                <s.ClearButtton onClick={limparCarrinho}>Limpar carrinho</s.ClearButtton>
            </s.ActionsButton>
        </s.SummaryContainer>
    </>)
}