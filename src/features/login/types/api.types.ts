import { loginCredential } from "@/shered/shered.types"

// ------------------------
// Execute login
// ------------------------
export type executeLogin_Props = (params: loginCredential) => Promise<void>

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose