import { useState } from "react"
import { useNotification } from "@/providers/notification.provider";
import { errorToNotification } from "@/system/notification/service/errorToNotification";
import { changeStatus } from "../api/changeStatus";
import { OrderStatus } from "@/server/order/order.types";

export const useChangeState = (orderId: string) => {
    const { adicionarNotificacao } = useNotification()
    const [loading, setLoading] = useState(false);

    const changeToStatus = async (status: OrderStatus) => {
        try {
            await changeStatus(status, orderId)
            setLoading(true)
        } catch (e) {
            adicionarNotificacao(errorToNotification(e))
        } finally {
            setLoading(false)
        }
    }

    return { loading, changeToStatus }
}