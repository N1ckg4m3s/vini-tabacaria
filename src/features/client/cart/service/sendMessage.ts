export const sendMessageToWhatsapp = (fullMessage: string) => {
    const encoded = encodeURIComponent(fullMessage)
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    
    if (!number) throw new Error('WhatsApp number not configured')

    window.open(
        `https://wa.me/${number}?text=${encoded}`,
        '_blank'
    )
}