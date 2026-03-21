import { OrderItem } from '../../../../../shered/shered.types'
import { formatePrice } from '../../../../_shered/services/formaters/price.formater'
import * as s from './style'

interface props { Produto: OrderItem }

export const OrderProduct: React.FC<props> = ({ Produto }) => {
    const { product, quantity, unit_price } = Produto
    return (<>
        <s.itemContainer>
            <s.itemAccent>
                <span>{quantity}x</span>
            </s.itemAccent>

            {product.imagem ? <s.image src={product.imagem} /> : <s.imageDiv />}

            <s.infosConainer>
                <s.infoName>{product.nome}</s.infoName>
                <s.infoBrand>{product.marca}</s.infoBrand>
                <s.infoUnitPrice>{formatePrice(unit_price)} cada</s.infoUnitPrice>
            </s.infosConainer>

            <s.subTotal>{formatePrice(quantity * unit_price)}</s.subTotal>

        </s.itemContainer>
    </>)
}