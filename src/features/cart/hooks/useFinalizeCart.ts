import { formatePrice } from "@/features/_shered/hooks/price.formater";
import { formatProdForHuman } from "../service/formatCartForHuman";
import { sendListToWatsapp } from "../service/sendListToWhatsapp";
import { useFinalize_Props } from "../types/HooksProps";
import { useCart } from "@/providers/cart.provider";

export const useFinalizeCart: useFinalize_Props = () => {
    const { produtos, total } = useCart()

    const onFinalize = () => {
        const produtosFormatado: string[] = produtos.map(p => formatProdForHuman(p))

        sendListToWatsapp(produtosFormatado, formatePrice(total))
    }

    return { onFinalize }
}