'use client'

import { CartProduto, Produto } from '@/shered/shered.types';
import React, { createContext, useContext, useState } from 'react';

// --------------------
// Context
// --------------------
interface cartContextProps {
    produtos: CartProduto[]
    total: number

    adicionarProduto: (prod: Produto) => void
    removerProduto: (id: string) => void
    modificarProduto: (id: string, quantidade: number) => void
    verificarProduto: (id: string) => boolean
    calcularTotal(): void
}
const cartContext = createContext<cartContextProps>({} as any);

// --------------------
// Provedor
// --------------------
interface cartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<cartProviderProps> = ({ children }) => {
    const [produtos, setProdutos] = useState<CartProduto[]>([])
    const [total, setTotal] = useState<number>(0)

    // ===== Adicionar produto
    const adicionarProduto = (prod: Produto) => {
        const produtoAdd: CartProduto = {
            produto: prod,
            quantidade: 1,
            subTotal: prod.valor
        }

        setProdutos((prev) => [...prev, produtoAdd])
    }

    // ===== Remover produto
    const removerProduto = (id: string) => {
        setProdutos(prev => prev.filter(p => p.produto.id !== id));
    }

    // ===== Alterar produto
    const modificarProduto = (id: string, quantidade: number) => {
        setProdutos(prev =>
            prev.map(p =>
                p.produto.id === id ? {
                    ...p,
                    quantidade,
                    subTotal: p.produto.valor * quantidade
                } : p
            )
        )
    }

    // ===== Verificar produto
    const verificarProduto = (id: string): boolean => produtos.some(prod => prod.produto.id === id);

    // ===== Calcular total
    const calcularTotal = () => {
        const valorTotal = produtos.reduce((acc, prod) => acc + prod.subTotal, 0)
        setTotal(valorTotal)
    }

    return (
        <cartContext.Provider value={{
            adicionarProduto,
            calcularTotal,
            modificarProduto,
            removerProduto,
            verificarProduto,
            produtos,
            total
        }}>
            {children}
        </cartContext.Provider>
    )
}

// --------------------
// Use cart
// --------------------
export const useCart = () => useContext(cartContext);