import * as s from './style'

export const CartCard = () => {

    return (<>
        <s.CartCotaniner>
            <s.CartImage />
            <s.CartInformations>
                <s.CartTitle>Produto ABC</s.CartTitle>
                <s.CartMarca>Marca xyz</s.CartMarca>

                <s.Actions>
                    <s.QuantityContainer>
                        <s.QuantityButton>+</s.QuantityButton>
                        <span>1</span>
                        <s.QuantityButton>-</s.QuantityButton>
                    </s.QuantityContainer>
                    <s.Price>R$: 2,59</s.Price>
                </s.Actions>

                <s.RemoveButtton>
                    Remover
                </s.RemoveButtton>

            </s.CartInformations>
        </s.CartCotaniner>
    </>)
}