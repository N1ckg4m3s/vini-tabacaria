import { TableItem } from "./components.types"

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
    ViewedProducts: TableItem[],
    CartStats: TableItem[],
}
export type obterProdutosInsitesProps = () => Promise<obterProdutosInsitesRespose>