import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* exemple interface */
interface Produto {
    id: string
    nome: string
    preco: number
    quantidade: number
}

interface CartState {
    itens: Produto[]
}

const initialState: CartState = {
    itens: [],
}

const cartSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarProduto: (state, action: PayloadAction<Produto>) => {
            state.itens.push(action.payload)
        },
        removerProduto: (state, action: PayloadAction<string>) => {
            state.itens = state.itens.filter(item => item.id !== action.payload)
        },
        limparCarrinho: (state) => {
            state.itens = []
        },
    },
})

export const { adicionarProduto, removerProduto, limparCarrinho } = cartSlice.actions
export default cartSlice.reducer
