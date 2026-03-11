import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'
import { QuantityControl } from '@/features/_shered/components/quantityControl/component'
import { CartProductUiFormat } from '../../types/HooksProps'
import { CartCardStatusOutOfStock } from '../cartCardStatus/status_outOfStock'
import { CartCardStatusPriceChange } from '../cartCardStatus/status_priceChange'

interface props {
    Produto: CartProductUiFormat
}

export const CartCard: React.FC<props> = ({ Produto }) => {
    return (<>
        <s.CartCotaniner>
            {Produto.image ? <s.CartImage src={Produto.image} /> : <s.CartImageDiv />}
            <s.CartInformations>
                <s.CartTitle>{Produto.nome}</s.CartTitle>
                <s.CartMarca>{Produto.marca}</s.CartMarca>

                <s.Actions>
                    <QuantityControl
                        onAumentar={Produto.OnAumentarQuantidade}
                        onDefinir={(v: number) => Produto.OnDefinirQuantidade(v)}
                        onDiminuir={Produto.OnDiminuiorQuantidade}
                        quantidade={Produto.quantidade}
                    />
                    <s.Price>{formatePrice(Produto.subTotal)}</s.Price>
                </s.Actions>

                <s.RemoveButtton onClick={Produto.OnRemover}> Remover </s.RemoveButtton>
            </s.CartInformations>

            {/* Status AREA */}

            {Produto.status === "out_of_stock" && <CartCardStatusOutOfStock />}

            {Produto.status === "price_changed" && <CartCardStatusPriceChange />}
        </s.CartCotaniner>
    </>)
}