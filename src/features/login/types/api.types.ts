import { loginCredential } from "./type"

// ------------------------
// Execute login
// ------------------------
type executeLogin_Respose = {
    token: string
}

export type executeLogin_Props = (params: loginCredential) => Promise<executeLogin_Respose>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose