import { useState } from "react";
import { useCart } from "@/providers/cart.provider";
import { useNotification } from "@/providers/notification.provider";
import { saveOrder } from "../api/saveOrder";
import { useFinalize_Props } from "../types/HooksProps";
import { generateMessage } from "../service/generateMessage";
import { sendMessageToWhatsapp } from "../service/sendMessage";
import { errorToNotification } from "@/system/notification/service/errorToNotification";

export const useFinalizeCart: useFinalize_Props = () => {
    const { adicionarNotificacao } = useNotification()
    const { produtos, total } = useCart()
    const [loading, setLoading] = useState(false)

    const onFinalize = async () => {
        if (produtos.length == 0) return;

        if (total < 0) {
            adicionarNotificacao({
                message: 'há produtos a ser verificados',
                title: "Ops, Não é possivel finalizar",
                type: "Warning"
            })
            return;
        }
        try {
            setLoading(true)
            const orderId = await saveOrder(produtos)
            const message = generateMessage(orderId, total)

            sendMessageToWhatsapp(message)
        } catch (e) {
            adicionarNotificacao(errorToNotification(e))
        } finally {
            setLoading(false)
        }
    }

    return { onFinalize, loading }
}