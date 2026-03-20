import { Metadata } from 'next';
import { getOrderById } from '../../../../../features/core/order/service/getOrderById';
import { OrderView } from '../../../../../features/core/order/components/orderView/component';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Informações do produto",
    description: "Informações do produto",
};

export default async function Page({ params }: { params: { id: string } }) {
    const orderId = params.id

    const order = await getOrderById(orderId)

    return(
        <>
            {/* Editor do status */}
            <OrderView order={order} />
        </>
    )
}
