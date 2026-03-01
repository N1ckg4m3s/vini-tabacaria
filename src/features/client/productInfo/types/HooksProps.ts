import { Produto } from "@/shered/shered.types"

// ------------------------
// Use relativos parametros
// ------------------------
type useRelactive_Params = { id: string, relacao: "marca" | "relevancia" }
type useRelactive_Respose = { products: Produto[], loading: boolean }

export type useRelactive_Props = (params: useRelactive_Params) => useRelactive_Respose

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose