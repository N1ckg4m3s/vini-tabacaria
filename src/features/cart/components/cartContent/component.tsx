import { CartCard } from '../cartCard/component'
import * as s from './style'

export const CartContent = () => {
    return (<>
        <s.CartItens>
            <CartCard />
            <CartCard />
            <CartCard />
        </s.CartItens>
    </>)
}