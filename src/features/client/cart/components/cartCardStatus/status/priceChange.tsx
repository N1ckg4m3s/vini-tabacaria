import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from '../style'

interface props {
    oldPrice?: number,
    newPrice?: number
    accept: () => void
    remove: () => void
}

export const PriceChanged: React.FC<props> = ({ accept, remove, newPrice, oldPrice }) => {
    return (
        <>
            <s.Title>O preço mudou</s.Title>

            <s.Container>
                <s.OldPrice>{formatePrice(oldPrice)}</s.OldPrice>
                <s.Arrow>→</s.Arrow>
                <s.NewPrice>{formatePrice(newPrice)}</s.NewPrice>
            </s.Container>

            <s.Text>Deseja continuar com o produto no carrinho?</s.Text>

            <s.Container>
                <s.ButtonAccept onClick={accept}>
                    Aceitar
                </s.ButtonAccept>

                <s.ButtonRemove onClick={remove}>
                    Remover
                </s.ButtonRemove>
            </s.Container>
        </>
    )
}