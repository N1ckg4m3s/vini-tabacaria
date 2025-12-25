import { useNotification } from "@/providers/notification.provider"
import { useLogin_Props } from "../types/hooks.types"
import { validateSenha } from "../services/validateForm"
import { errorToNotification } from "@/features/notification/service/errorToNotification"
import { ExecuteLoginRequest } from "../api/executeLogin"
import { useState } from "react"
import { validateEmail } from "@/shered/validators/email.validator"
import { loginCredential } from "@/shered/shered.types"
import { useRouter } from "next/navigation"

export const useLogin: useLogin_Props = () => {
    const { push } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const { adicionarNotificacao } = useNotification()

    const executeLogin = async (params: loginCredential) => {
        setLoading(true)
        const { email, password } = params
        try {
            validateEmail(email)
            validateSenha(password)

            await ExecuteLoginRequest({ email, password })

            push('/admin/product/list')
        } catch (e) {
            adicionarNotificacao(errorToNotification(e))
        } finally {
            setLoading(false)
        }
    }

    return { executeLogin, loading }
}