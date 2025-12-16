import { Produto } from "@/shered/shered.types"

// ------------------------
// Obter produto
// ------------------------
type getProduct_Params = { id: string }

type getProduct_Respose = { product: Produto | undefined }

export type getProduct_Props = (params: getProduct_Params) => Promise<getProduct_Respose>

// ------------------------
// Obter produtos relativos parametros
// ------------------------
type getRelactive_Params = { id: string, relacao: "marca" | "relevancia" }

type getRelactive_Respose = { products: Produto[] }

export type getRelactive_Props = (params: getRelactive_Params) => Promise<getRelactive_Respose>