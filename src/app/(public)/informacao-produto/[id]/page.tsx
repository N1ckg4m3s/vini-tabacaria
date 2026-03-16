import { ProductInfoComponent } from '@/features/client/productInfo/pages/productInfo.page';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Informações do produto",
    description: "Informações do produto",
};

export default function Page() {
    return <ProductInfoComponent />
};