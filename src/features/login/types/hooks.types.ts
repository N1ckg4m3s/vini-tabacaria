import { loginCredential } from "./type"

// ------------------------
// Use login
// ------------------------
type useLogin_Respose = {
    executeLogin: (params: loginCredential) => void,
    loading: boolean
}

export type useLogin_Props = () => useLogin_Respose

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose