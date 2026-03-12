import React from "react"
import * as s from './style'
import { CartItemStatus, CartProduto } from "@/shered/shered.types"
import { OutOfStock } from "./status/outOfStock"
import { PriceChanged } from "./status/priceChange"

type props = Pick<CartProduto, 'status'> & {
    actions: {
        onAccept: () => void,
        onRemove: () => void,
    }
}

export const CardStatusOverlay: React.FC<props> = ({ status, actions }) => {
    const statusMap: Record<CartItemStatus, React.ReactNode> = {
        valid: <></>,
        out_of_stock: <OutOfStock remove={actions.onRemove} />,
        price_changed: <PriceChanged
            accept={actions.onAccept}
            newPrice={status.metadata.newPrice}
            oldPrice={status.metadata.oldPrice}
            remove={actions.onRemove}
        />,
    }

    if (status.type === "valid") return statusMap[status.type];

    return (<s.StatusContainer>{statusMap[status.type]}</s.StatusContainer>)
}