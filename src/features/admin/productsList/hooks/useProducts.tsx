import { useEffect, useState } from "react"
import { useProductsListProps } from "../types/hooks.types"
import { fetchProductsPaginated } from "@/features/_shered/services/getAllItens"
import { Produto } from "@/shered/shered.types"

export const useProductsList: useProductsListProps = ({ numeroPorPagina, paginaAtual, search }) => {
    const [products, setProducts] = useState<Produto[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        const asyncFunction = async () => {
            const productResponse = await fetchProductsPaginated({
                filtros: {},
                limit: numeroPorPagina,
                paginaAtual,
                search,
            })
            setProducts(productResponse.itens)
            setTotalPages(productResponse.totalPages)
        }
        asyncFunction()
    }, [paginaAtual, search])

    return { products, totalPages }
}