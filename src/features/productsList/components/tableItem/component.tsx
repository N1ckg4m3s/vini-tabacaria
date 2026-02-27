import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'
import { Produto } from "@/shered/shered.types"

/*
<tr>
    <s.th>Produto</s.th>
    <s.th>Marca</s.th>
    <s.th>Tipo</s.th>
    <s.th>Preço</s.th>
    <s.th>Ações</s.th>
</tr>
*/

export const ProductItem: React.FC<{ produto: Produto }> = ({ produto }) => {
    return (
        <s.trBody>
            <s.td>{produto.nome}</s.td>
            <s.td>{produto.marca}</s.td>
            <s.td>{produto.tipo}</s.td>
            <s.td>{formatePrice(produto.valor)}</s.td>
            <s.td>
                <s.tdActionButton>Editar</s.tdActionButton>
            </s.td>
        </s.trBody>
    )
}