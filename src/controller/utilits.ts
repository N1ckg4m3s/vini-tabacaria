/**
 * Valida se um texto passado é um email
 * 
 * @param {string} email - Texto a ser validado como e-mail.
 * @returns {boolean} `true` se for um e-mail válido, `false` caso contrário.
*/
export default function validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}