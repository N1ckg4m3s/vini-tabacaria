import { combineReducers } from '@reduxjs/toolkit'
import carinhoReducer from './slices/carrinho-slice'

export const rootReducer = combineReducers({
    carrinho: carinhoReducer,
})
