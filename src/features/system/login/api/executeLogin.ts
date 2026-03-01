import { NoResponseError } from "@/http/error/erros.handle"
import { executeLogin_Props } from "../types/api.types"
import { loginCredential } from "@/shered/shered.types"
import { apiCaller } from "@/features/_shered/services/apiCaller"

export const ExecuteLoginRequest: executeLogin_Props = async (params: loginCredential) => {
    const request = await apiCaller({
        url: 'api/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email: params.email,
            password: params.password
        }
    })

    if (!request) {
        throw new NoResponseError()
    }
}