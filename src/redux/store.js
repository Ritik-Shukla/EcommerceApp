import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./reducers/homeReducer";
import { cartReducer } from "./reducers/cartReducer";
export const store = configureStore({
    reducer:{
      homeReducer,
      cartReducer
    }
})