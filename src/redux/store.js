
import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slides/productSlide'
import UserReducer from './slides/userSlide'

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: UserReducer
  }
})
