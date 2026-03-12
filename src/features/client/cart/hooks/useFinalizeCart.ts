import { formatePrice } from "@/features/_shered/services/formaters/price.formater";
import { formatProdForHuman } from "../service/formatCartForHuman";
import { sendListToWatsapp } from "../service/sendListToWhatsapp";
import { useFinalize_Props } from "../types/HooksProps";
import { useCart } from "@/providers/cart.provider";
import { useNotification } from "@/providers/notification.provider";

export const useFinalizeCart: useFinalize_Props = () => {
    const { adicionarNotificacao } = useNotification()
    const { produtos, total } = useCart()

    const onFinalize = () => {
        if (produtos.length == 0) return;

        if (total < 0) {
            adicionarNotificacao({
                message: 'há produtos a ser verificados',
                title: "Ops, Não é possivel finalizar",
                type: "Warning"
            })
            return;
        }

        const produtosFormatado: string[] = produtos.map(p => formatProdForHuman(p))

        sendListToWatsapp(produtosFormatado, formatePrice(total))
    }

    return { onFinalize }
}