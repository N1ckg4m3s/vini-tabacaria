import { OrderStatus } from "../server/order/order.types";

// --------------------
// Campos base nos produtos
// --------------------
export interface Produto {
  id: string;
  nome: string;
  marca: string;
  valor: number;
  tipo: string;
  imagem?: string | null | File;
  metadata: Record<string, string | number | string[] | number[] | boolean>
}
export type ProdutoSemID = Omit<Produto, 'id'>

// --------------------
// Produto no carrinho
// --------------------
export type CartItemStatus = 'valid' | 'out_of_stock' | 'price_changed'
export interface ProductWithStatus extends Partial<Produto> {
  status: CartItemStatus
}
export interface CartProduto {
  quantidade: number
  subTotal: number
  produto: Produto
  status: {
    type: CartItemStatus,
    metadata: {
      newPrice?: number,
      oldPrice?: number
    }
  }
}

// --------------------
// Formato dos filtros
// --------------------
export interface FilterSource {
  value: string,
  count: number,
  checked?: boolean
}
export type CatalogFilterSource = Record<string, FilterSource[]>
export type CatalogFilterSourceSanitized = Record<string, string[]>

export interface CatalogFilters {
  search?: string

  // sempre ARRAY
  marca?: string[]
  tipo?: string[]

  // sempre NUMBER
  precoMin?: number
  precoMax?: number

  meta?: {
    sabor?: string[]
    intensidade?: string[]
    pacote?: string[]
    tipo?: string[]
    cor?: string[]
    tamanho?: string[]
    kit?: string[]
  }
}

export const filtrosPorTipo = {
  essencia: ["sabor", "intensidade", "mix", "tipo"],
  acessorio: ["cor", "tamanho", "tipo"],
  carvao: ["kit", "tipo"],
  aluminio: ["kit", "tipo"],
  outros: ["especificacao"],
} as const;

// --------------------
// Credenciais de login
// --------------------
export interface loginCredential {
  email: string
  password: string
}

// --------------------
// Order do pedido
// --------------------
export type OrderProduct = Pick<Produto, 'nome' | 'marca' | 'tipo' | 'imagem'>

export type OrderItem = {
  quantity: number,
  unit_price: number,
  product: OrderProduct
}

export interface Order {
  id: string,
  total: number,
  status: OrderStatus
  order_items: OrderItem[]
}