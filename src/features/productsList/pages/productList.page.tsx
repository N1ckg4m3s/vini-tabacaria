'use client'

import PaginacaoComponente from "@/components/CatalogComponents/paginacao-component/component"
import { useState } from "react"
import { useProductsList } from "../hooks/useProducts"
import * as s from './style'
import { ProductItem } from "../components/tableItem/component"

export const ProductList = () => {
    const [paginaAtual, setPaginaAtual] = useState(1)
    const { products, totalPages } = useProductsList({ numeroPorPagina: 30, paginaAtual })

    return (
        <>
            <s.adminContent>
                <s.adminHeader>
                    <h1>Lista de produtos</h1>
                    <s.headerActions>
                        <s.headerinput type="text" placeholder="Pesquisar produto por nome, marca ou tipo" />
                    </s.headerActions>
                </s.adminHeader>
            </s.adminContent>

            <s.tableWarper>
                <s.table>
                    <s.thead>
                        <tr>
                            <s.th>Produto</s.th>
                            <s.th>Marca</s.th>
                            <s.th>Tipo</s.th>
                            <s.th>Preço</s.th>
                            <s.th>Ações</s.th>
                        </tr>
                    </s.thead>
                    <tbody>
                        {products.map((p) => <ProductItem produto={p} />)}
                    </tbody>
                </s.table>
            </s.tableWarper>

            <PaginacaoComponente
                changeTo={setPaginaAtual}
                numeroDePaginas={totalPages}
                paginaAtual={paginaAtual}
            />
        </>
    )
}