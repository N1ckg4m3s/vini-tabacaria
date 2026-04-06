import { loginCredential } from "@/shered/shered.types" 

// ------------------------
// Execute login
// ------------------------
export type executeLogin_Props = (params: loginCredential) => Promise<void>