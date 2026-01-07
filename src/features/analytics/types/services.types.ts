// --------------------
// Notificando produto visualizado
// --------------------
type notifyProductViewdParams = {}
type notifyProductViewdResponse = {}

export type notifyProductViewdProps = (params: notifyProductViewdParams) => notifyProductViewdResponse

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