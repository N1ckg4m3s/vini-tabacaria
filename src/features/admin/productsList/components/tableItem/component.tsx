import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'
import { Produto } from "@/shered/shered.types"
import { useRouter } from 'next/navigation';

export const ProductItem: React.FC<{ produto: Produto }> = ({ produto }) => {
    const router = useRouter();
    const navigateToEdit = () => router.push(`/admin/product/${produto.id}`);

    return (
        <s.trBody>
            <s.td>{produto.nome}</s.td>
            <s.td>{produto.marca}</s.td>
            <s.td>{produto.tipo}</s.td>
            <s.td>{formatePrice(produto.valor)}</s.td>
            <s.td>
                <s.tdActionButton onClick={navigateToEdit}>Editar</s.tdActionButton>
            </s.td>
        </s.trBody>
    )
}