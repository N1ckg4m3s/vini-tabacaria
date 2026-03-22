import { Metadata } from 'next';
import { getOrderById } from '../../../../../features/core/order/service/getOrderById';
import { OrderView } from '../../../../../features/core/order/components/orderView/component';
import { notFound } from 'next/navigation';
import { Order } from '../../../../../shered/shered.types';
import { OrderStatusChanger } from '../../../../../features/core/order/components/status_changer/component';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Informações do produto",
    description: "Informações do produto",
};


export default async function Page({ params }: { params: { id: string } }) {
    const orderId = (await params).id

    let order: Order

    try {
        order = await getOrderById(orderId)
    } catch {
        notFound()
    }

    return (<>
        <OrderStatusChanger
            actualStatus={order.status}
            orderId={orderId}
        />
        <OrderView order={order} />
    </>)
}
