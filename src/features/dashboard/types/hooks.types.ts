import { TableItem } from "./components.types"

// ------------------------
// use Actions
// ------------------------
type UseActionsResponse = {}
export type UseActionsProps = () => UseActionsResponse

// ------------------------
// use Directions
// ------------------------
export type UseDirections = {
    ViewedProducts: TableItem[],
    CartStats: TableItem[],
}
export type UseDirectionsProps = () => UseDirections

// ------------------------
// use Pulse
// ------------------------
type usePulseRespose = {
    todayAcess: number | null
    weeklyAccesses: number | null
    topDevice: string | null
    topDevicePercentage: number | null
}
export type usePulseProps = () => usePulseRespose