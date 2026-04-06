'use client'

import styled from "styled-components"
import { OrderItem } from "@/shered/shered.types"
import { flexColumn } from "@/styles/mixins"
import { OrderProduct } from "../orderProduct/component"

interface props {
    products: OrderItem[]
}

const ListItem = styled.div`
    ${flexColumn}
    gap: 12px;
`

export const OrderProductList: React.FC<props> = ({ products }) => {
    return (
        <ListItem>
            {products.map((item, index) =>
                <OrderProduct key={index} Produto={item} />
            )}
        </ListItem>
    )
}