import { DataInsite } from "./service.types"

// ------------------------
// Obter pulso do usuario
// ------------------------
export type PulsoDeUso = {
    todayAcess: number
    weeklyAccesses: number
    topDevice: string
    topDevicePercentage: number
}
export type obterPulsoDeUsoProps = () => Promise<PulsoDeUso>

// ------------------------
// Obter produtos insights
// ------------------------
type obterProdutosInsitesRespose = {
    ViewedProducts: DataInsite[],
    CartStats: DataInsite[],
}
export type obterProdutosInsitesProps = () => Promise<obterProdutosInsitesRespose>