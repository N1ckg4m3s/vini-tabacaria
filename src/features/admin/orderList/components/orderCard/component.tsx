'use client'

import { useRouter } from 'next/navigation'
import { formatePrice } from '@/_shered/services/formaters/price.formater'
import { orderResume } from '../../types/type'
import * as s from './style'

interface props {
    order: orderResume
}

export const OrderCardResume: React.FC<props> = ({ order }) => {
    const router = useRouter()

    const renderOrderDate = () => {
        const day = String(order.created_at.getDate()).padStart(2, '0');
        const month = String(order.created_at.getMonth() + 1).padStart(2, '0');
        const hour = String(order.created_at.getHours()).padStart(2, '0');
        const min = String(order.created_at.getMinutes()).padStart(2, '0');

        return `${day}/${month} - ${hour}:${min}`;
    };

    const renderOrderQuant = () => {
        const amount = order.order_products_count;
        const text = amount === 1 ? 'produto' : 'produtos';
        return `${amount} ${text}`;
    };

    return (
        <>
            <s.orderContainer
                status={order.status}
                onClick={() => { router.push(`/admin/order/${order.id}`) }}
            >
                <s.orderHeader>
                    <s.orderStatus>{order.status}</s.orderStatus>
                    <s.orderTotal>{formatePrice(order.total)}</s.orderTotal>
                </s.orderHeader>

                <s.orderBody>
                    <s.orderBodySpan>{renderOrderQuant()}</s.orderBodySpan>
                    <s.orderBodySpan>{renderOrderDate()}</s.orderBodySpan>
                </s.orderBody>

                <s.orderFooter> {order.id.slice(0, 10)} </s.orderFooter>
            </s.orderContainer>
        </>
    )
}