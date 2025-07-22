import { Produto } from '@/controller/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* Cart Item */
interface CartItem {
    id: number
    produto: Produto,
    quantidade: number
}


interface CartState {
    itens: CartItem[]
}

const initialState: CartState = {
    itens: [],
}

const cartSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarProduto: (state, action: PayloadAction<CartItem>) => {
            state.itens.push(action.payload)
        },
        removerProduto: (state, action: PayloadAction<string>) => {
            state.itens = state.itens.filter(item => item.id !== parseInt(action.payload))
        },
        limparCarrinho: (state) => {
            state.itens = []
        },
    },
})

export const { adicionarProduto, removerProduto, limparCarrinho } = cartSlice.actions
export default cartSlice.reducer
