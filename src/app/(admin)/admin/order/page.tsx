import { Metadata } from 'next';
import { OrderList } from '../../../../features/admin/orderList/page/orderList';
import { OrderService } from '../../../../server/order/order.service';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Lista de pedidos",
    description: "Informações do produto",
};

interface searchParams {
    searchParams: {
        page?: number,
        limit?: number,
        tab?: string
    }
}

export default async function Page({ searchParams }: searchParams) {
    const params = await searchParams
    const { page, limit, tab } = params

    const validTabs = ['processing', 'finished'] as const
    const selectedTab = (validTabs.includes(tab as any) ? tab : 'processing') as 'processing' | 'finished'

    const service = new OrderService()

    const OrderSection = await service.getAllOrdersByTab({ page, tab: selectedTab, limit })

    return <OrderList
        OrdersSections={OrderSection.data}
        pagination={{
            ...OrderSection.pagination,
            page
        }}
        tabSelected={selectedTab}
    />
}
