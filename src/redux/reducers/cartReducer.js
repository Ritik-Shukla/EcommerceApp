import {createSlice}  from "@reduxjs/toolkit";
import { createPath } from "react-router-dom";

const initialState = {
    cartProducts:[],
    cartCount:0,
    cartPrice:0
}


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            const productToAdd = { ...action.payload, cnt: 1 , itemPrice:action.payload.price,isInCart:true}; 

            const isProductInCart = state.cartProducts.some(
                (product) => product.id === productToAdd.id
            );
        
            if (!isProductInCart) {
                state.cartProducts.push(productToAdd);
                state.cartCount += 1;
                state.cartPrice+=productToAdd.price;
                // state.cartPrice += productToAdd.price;
            }
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            const product = state.cartProducts.findIndex((p) => p.id === productId);
            if(product!=-1){
            const item = state.cartProducts.find((p)=>p.id===action.payload)
                        console.log(action.payload)
            state.cartCount-=item.cnt;
            state.cartPrice-=item.itemPrice;
            state.cartProducts.splice(product,1);
            }
        },
        clear:(state,action)=>{
            state.cartCount=0;
            state.cartPrice = 0;
state.cartProducts.splice(0,state.cartProducts.length);
        },
        incrementCnt:(state,action)=>{
            const productId = action.payload;
            const product = state.cartProducts.find((p) => p.id === productId);
            if (product) {
                product.cnt += 1;
                // state.cartCount+=1;
                // state.cartCount += 1;
                state.cartCount+=1;
                state.cartPrice += product.price;
                product.itemPrice+=product.price;
              }
        },
        decrementCnt:(state,action)=>{
            const productId = action.payload;
            const product = state.cartProducts.find((p)=>p.id===productId);
            if(product){
                if(product.cnt>1){
                    product.cnt-=1;
                    state.cartCount-=1;
                    state.cartPrice-=product.price;
                    product.itemPrice-=product.price;
                }
            }
        }
    }
})

export const cartReducer=cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state)=>state.cartReducer;