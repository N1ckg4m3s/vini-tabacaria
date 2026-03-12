import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'
import { QuantityControl } from '@/features/_shered/components/quantityControl/component'
import { CartProductUiFormat } from '../../types/HooksProps'
import { CardStatusOverlay } from '../cartCardStatus/cardStatusOverlay'

interface props {
    Produto: CartProductUiFormat
}

export const CartCard: React.FC<props> = ({ Produto }) => {
    const { product, actions, status } = Produto

    return (<>
        <s.CartCotaniner>
            {product.imagem ? <s.CartImage src={product.imagem} /> : <s.CartImageDiv />}
            <s.CartInformations>
                <s.CartTitle>{product.nome}</s.CartTitle>
                <s.CartMarca>{product.marca}</s.CartMarca>

                <s.Actions>
                    <QuantityControl
                        onAumentar={actions.OnAumentarQuantidade}
                        onDefinir={(v: number) => actions.OnDefinirQuantidade(v)}
                        onDiminuir={actions.OnDiminuiorQuantidade}
                        quantidade={product.quantidade}
                    />
                    <s.Price>{formatePrice(product.valor * product.quantidade)}</s.Price>
                </s.Actions>

                <s.RemoveButtton onClick={actions.OnRemover}> Remover </s.RemoveButtton>
            </s.CartInformations>

            {/* Overlay de status do produto */}
            <CardStatusOverlay
                actions={{
                    onAccept: actions.onAcceptNewStatus,
                    onRemove: actions.OnRemover,
                }}
                status={status}
            />
        </s.CartCotaniner>
    </>)
}