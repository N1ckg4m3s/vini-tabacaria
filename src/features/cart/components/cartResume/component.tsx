import { formatePrice } from '@/features/_shered/hooks/price.formater'
import * as s from './style'

interface props {
    subTotal: number,
    entrega: number,
    total: number
}

export const CartResume: React.FC<props> = ({ entrega, subTotal, total }) => {

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

            <s.FinishButton>Finalizar compra</s.FinishButton>
        </s.SummaryContainer>
    </>)
}