'use client';

import { useRouter } from 'next/navigation';
import { UseActionsProps } from "../types/hooks.types";

export const useActions: UseActionsProps = () => {
    const router = useRouter();

    const navigateToProductList = () => router.push('/admin/product/list');

    const navigateToAddProduct = () => router.push('/admin/product/new');
    
    const navigateToClient = () => router.push('/');

    return {
        navigateToProductList,
        navigateToAddProduct,
        navigateToClient
    };
}