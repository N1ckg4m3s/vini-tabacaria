import { CartComponent } from '@/features/client/cart/pages/cart.page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Vini Tabacaria | Carrinho",
    description: "Carrinho de cotação da Vini Tabacaria",
};

export default () => {
    return <CartComponent />
}