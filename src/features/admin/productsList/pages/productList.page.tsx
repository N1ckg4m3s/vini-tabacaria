'use client'

import PaginacaoComponente from "@/components/CatalogComponents/paginacao-component/component"
import { useState } from "react"
import { useProductsList } from "../hooks/useProducts"
import * as s from './style'
import { ProductItem } from "../components/tableItem/component"
import { useDebounce } from "@/features/_shered/hooks/useDebounce"

export const ProductList = () => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const { products, totalPages } = useProductsList({
        numeroPorPagina: 30,
        paginaAtual,
        search: debouncedSearch
    });

    return (
        <>
            <s.adminContent>
                <s.adminHeader>
                    <h1>Lista de produtos</h1>
                    <s.headerActions>
                        <s.headerinput
                            type="text"
                            placeholder="Pesquisar produto por nome, marca ou tipo"
                            value={search}
                            onChange={(e) => {
                                setPaginaAtual(1);
                                setSearch(e.target.value);
                            }}
                        />
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
                        {products.map((p) => <ProductItem key={p.id} produto={p} />)}
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