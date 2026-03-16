import { loginCredential } from "../../../../shered/shered.types"

// ------------------------
// Use login
// ------------------------
type useLogin_Respose = {
    executeLogin: (params: loginCredential) => void,
    loading: boolean
}

export type useLogin_Props = () => useLogin_Respose