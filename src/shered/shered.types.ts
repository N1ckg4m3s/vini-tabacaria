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
export interface CartProduto {
  produto: Produto
  quantidade: number
  subTotal: number
}

// --------------------
// Formato dos filtros
// --------------------
export interface CatalogFilterSource {
  marca?: string[]
  tipo?: string[]
  meta?: {
    sabor?: string[]
    intensidade?: string[]
    cor?: string[]
    tamanho?: string[]
    kit?: string[]
  }
}

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