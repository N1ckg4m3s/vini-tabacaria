import { apiCaller } from "@/controller/apiCaller"
import { NoResponseError } from "@/http/error/erros.handle"
import { executeLogin_Props } from "../types/api.types"
import { loginCredential } from "@/shered/shered.types"

export const ExecuteLoginRequest: executeLogin_Props = async (params: loginCredential) => {
    const request = await apiCaller({
        url: '',
        params: {
            email: params.email,
            password: params.password,
        }
    })

    if (!request) {
        throw new NoResponseError()
    }

    return {
        token: ''
    }
}