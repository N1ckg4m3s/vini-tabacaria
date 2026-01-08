export type PulseData = {
    todayAcess: number;
    weeklyAccesses: number;
    topDevice: 'Mobile' | 'Desktop';
    topDevicePercentage: number;
}

export type getLast7DaysParams = { hoje: string, seteDiasAtras: string, }
export type getLast7DaysProps = (params: getLast7DaysParams) => Promise<PulseData>;

export type ProductInfo = {
  nome: string
  marca: string
  tipo: string
}

export type CartIntentionRow = {
  product_id: string
  total_added: number
  total_removed: number
  intention_score: number
  products: ProductInfo
}
