// --------------------
// Notificando produto visualizado
// --------------------
export type notifyProductViewdProps = () => void

// --------------------
// Formato do localStorage do Visualizado
// --------------------
export type ProductViewedStorageFormat = {
    date: string;
    products: string[];
}

// --------------------
// Formato do localStorage da Intenção de Compra
// --------------------
export type ProductIntention = {
    productId: string;
    atempts: {
        add: number;
        remove: number;
    };
}
export type ProductIntentionStorageFormat = {
    date: string;
    products: ProductIntention[];
}