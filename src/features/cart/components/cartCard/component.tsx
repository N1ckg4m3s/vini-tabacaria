import { formatePrice } from '@/features/_shered/hooks/price.formater'
import * as s from './style'
import { QuantityControl } from '@/features/_shered/components/quantityControl/component'

interface props {
    Nome: string
    Marca: string
    Image?: string
    Quantidade: number
    SubTotal: number
    OnAumentarQuantidade: () => void
    OnDiminuiorQuantidade: () => void
    OnDefinirQuantidade: (value: number) => void
    OnRemover: () => void
}

export const CartCard: React.FC<props> = ({ Marca, Nome, Image, Quantidade, SubTotal, OnAumentarQuantidade, OnDefinirQuantidade, OnDiminuiorQuantidade, OnRemover }) => {
    return (<>
        <s.CartCotaniner>
            <s.CartImage />
            <s.CartInformations>
                <s.CartTitle>{Nome}</s.CartTitle>
                <s.CartMarca>{Marca}</s.CartMarca>

                <s.Actions>
                    <QuantityControl
                        onAumentar={() => OnAumentarQuantidade}
                        onDefinir={(v:number) => OnDefinirQuantidade(v)}
                        onDiminuir={() => OnDiminuiorQuantidade}
                        quantidade={Quantidade}
                    />
                    <s.Price>{formatePrice(SubTotal)}</s.Price>
                </s.Actions>

                <s.RemoveButtton onClick={OnRemover}> Remover </s.RemoveButtton>
            </s.CartInformations>
        </s.CartCotaniner>
    </>)
}