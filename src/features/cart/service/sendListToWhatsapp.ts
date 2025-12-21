import { sendListToWatsapp_Props } from "../types/ServicesProps";

const apresentacao = 'Olá! Fiz uma cotação pelo site e gostaria de confirmar:'

export const sendListToWatsapp: sendListToWatsapp_Props = (produtos, total) => {
    // 'copiar' apresentação
    let message = `${apresentacao}\n\n`

    // 'Adicionar' produtos
    message += produtos.map(p => `- ${p}`).join('\n')

    // 'Adicionar' espaçamento
    message += '\n\n'

    // 'Adicionar' total
    message += `Total estimado: ${total}`

    const encoded = encodeURIComponent(message)

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

    if (!number) throw new Error('WhatsApp number not configured')

    window.open(
        `https://wa.me/${number}?text=${encoded}`,
        '_blank'
    )
}