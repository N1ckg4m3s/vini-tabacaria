import { CSSProperties } from "react"
import { Order } from "@/shered/shered.types"
import { OrderFooter } from "../footer/component"
import { OrderHeader } from "../header/component"
import { OrderProductList } from "../product_list/component"

interface props { order: Order }

const styledDiv: CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0px 20px 20px 20px',
}

export const OrderView: React.FC<props> = ({ order }) => {
    return (<div style={styledDiv}>
        <OrderHeader
            orderId={order.id}
            status={order.status}
        />
        <OrderProductList
            products={order.order_items}
        />
        <OrderFooter
            total={order.total}
        />
    </div>)
}