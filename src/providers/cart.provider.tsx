'use client'

import { useVerifyProducts } from '@/features/system/cart/hook/useVerifyProducts';
import { acceptNewStatus } from '@/features/system/cart/service/acceptNewStatus';
import { getLocalData, setLocalData } from '@/features/system/cart/service/LocalData.service';
import { CartProduto, Produto } from '@/shered/shered.types';
import React, { createContext, useContext, useEffect, useState } from 'react';

// --------------------
// Context
// --------------------
interface cartContextProps {
    produtos: CartProduto[]
    total: number

    adicionarProduto: (prod: Produto) => void
    removerProduto: (id: string) => void
    DiminuirQuantidade: (id: string) => void
    AumentarQuantidade: (id: string) => void
    DefinirQuantidade: (id: string, quantidade: number) => void
    obterQuantidade: (id: string) => number;
    verificarProduto: (id: string) => boolean
    calcularTotal(): void

    AceitarMudancaDeStatus: (id: string) => void

    limparCarrinho: () => void
}
const cartContext = createContext<cartContextProps>({} as any);

// --------------------
// Provedor
// --------------------
interface cartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<cartProviderProps> = ({ children }) => {
    const { verifyProducts } = useVerifyProducts()
    const [produtos, setProdutos] = useState<CartProduto[]>([])
    const [total, setTotal] = useState<number>(0)

    // SRP para verificar a existencia de um produto
    const existeProduto = (lista: CartProduto[], id: string): boolean => lista.some(p => p.produto.id === id)

    // ===== Adicionar produto
    const adicionarProduto = (prod: Produto) => {
        setProdutos(prev => {
            if (existeProduto(prev, prod.id)) return prev;
            return [...prev, {
                produto: prod,
                quantidade: 1,
                subTotal: prod.valor,
                status: {
                    type: 'valid',
                    metadata: {}
                }
            }]
        })
    }

    // ===== Remover produto
    const removerProduto = (id: string) => {
        setProdutos(prev => prev.filter(p => p.produto.id !== id));
    }

    // ===== Alterar produto ===== //
    // Diminui a quantidade até 1 e depois remove
    const DiminuirQuantidade = (id: string) => {
        setProdutos(prev =>
            prev.flatMap(p => {
                if (p.produto.id !== id) return [p]

                if (p.quantidade <= 1) {
                    return [] // remove
                }

                const novaQuantidade = p.quantidade - 1

                return [{
                    ...p,
                    quantidade: novaQuantidade,
                    subTotal: p.produto.valor * novaQuantidade
                }]
            })
        )
    }

    // Aumenta a quantidade
    const AumentarQuantidade = (id: string) => {
        setProdutos(prev =>
            prev.map(p =>
                p.produto.id === id
                    ? {
                        ...p,
                        quantidade: p.quantidade + 1,
                        subTotal: p.produto.valor * (p.quantidade + 1)
                    }
                    : p
            )
        )
    }

    // Define a quantidade
    const DefinirQuantidade = (id: string, value: number) => {
        if (value <= 0) return

        setProdutos(prev =>
            prev.map(p =>
                p.produto.id === id
                    ? {
                        ...p,
                        quantidade: value,
                        subTotal: p.produto.valor * value
                    }
                    : p
            )
        )
    }

    // Aceita a alteração do produto em casos de discordancia com o banco
    const AceitarMudancaDeStatus = (id: string) => {
        const produto = produtos.find(p => p.produto.id === id);

        if (!produto) return;

        const produtoUpdated: CartProduto = acceptNewStatus(produto);

        setProdutos(prev =>
            prev.map(p => {
                if (p.produto.id !== id) return p

                const produtoUpdated = acceptNewStatus(p)

                return {
                    ...produtoUpdated,
                    subTotal: p.quantidade * produtoUpdated.produto.valor
                }
            })
        )
    }

    // ===== Verificar produto
    const verificarProduto = (id: string): boolean => existeProduto(produtos, id);

    // ===== Verificar produto
    const obterQuantidade = (id: string): number => {
        const prod = produtos.find(prod => prod.produto.id === id)
        return prod ? prod.quantidade : 0
    };

    // ===== Calcular total
    const limparCarrinho = () => {
        setProdutos([])
    }

    // ===== Calcular total
    const calcularTotal = () => {
        const temProdutosInvalidos = produtos.some(p => p.status.type !== 'valid')

        // o valor de -1, significa que tem produtos invalidos, e pode ser tratado na tela de checkout para mostrar uma mensagem pro usuario
        if (temProdutosInvalidos) {
            setTotal(-1)
            return;
        }

        const valorTotal = produtos.reduce((acc, prod) => acc + prod.subTotal, 0)
        setTotal(valorTotal)
    }

    // Obter do 'local' ao iniciar
    useEffect(() => {
        const fetchData = async () => {
            const produtosSalvos = getLocalData()
            if (!produtosSalvos) return;

            const productsWithVerification = await verifyProducts(produtosSalvos);

            setProdutos(productsWithVerification)

            calcularTotal()
        }
        fetchData()
    }, [])

    // Salvar no 'local' ao alterar
    useEffect(() => {
        setLocalData(produtos)
        calcularTotal()
    }, [produtos])

    return (
        <cartContext.Provider value={{
            adicionarProduto,
            calcularTotal,
            DiminuirQuantidade,
            AumentarQuantidade,
            DefinirQuantidade,
            removerProduto,
            verificarProduto,
            obterQuantidade,
            limparCarrinho,
            AceitarMudancaDeStatus,
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