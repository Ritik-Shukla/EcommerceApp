import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
  isSort: false,
  originalproducts: [],
};
export const getInitialStateAsync = createAsyncThunk(
  "home/getInitialState",
  (Arg, thunkAPI) => {
    fetch("https://my-json-server.typicode.com/jaiswalaryan/data/products")
      .then((res) => res.json())
      .then((data) => {
        thunkAPI.dispatch(actions.setInitialState(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.products = [...action.payload];
      state.originalproducts = [...action.payload];
    for(let i = 0;i<state.products.length;i++){
        state.products[i].isEdit = false;
        state.originalproducts[i].isEdit = false;
    }
    },
    toogleItem: (state, action) => {
      state.products.map((product, i) => {
        if (i == action.payload) {
          // product.stock=-product.stock;
          product.isInCart = !product.isInCart;
          if (product.isInCart) {
            state.count++;
          } else {
            state.count--;
          }
        }
        return product;
      });
    },
    addItem: (state, action) => {
      //    state.products.push(action.payload);
      return {
        ...state,
        products: action.payload,
        originalproducts:action.payload
      };
    },
    deleteFromState: (state, action) => {
      const productId = action.payload;
      const item = state.products.find((p) => p.id === action.payload);
      console.log(action.payload);
      const product = state.products.findIndex((p) => p.id === productId);
      const p = state.originalproducts.findIndex((e)=>e.id===productId);
      state.products.splice(product, 1);
      state.originalproducts.splice(p,1)
    },
    editItem: (state, action) => {
      const { index, updatedProduct } = action.payload;
      // Find the product in the state based on index
      const productToUpdate = state.products[index];
      const productToUpdatee = state.originalproducts[index];
      // Update the properties of the product with the new values
      productToUpdate.title = updatedProduct.title;
      productToUpdate.description = updatedProduct.description;
      productToUpdate.price = updatedProduct.price;
      
      productToUpdatee.title = updatedProduct.title;
      productToUpdatee.description = updatedProduct.description;
      productToUpdatee.price = updatedProduct.price;
      // Toggle off the edit mode
      productToUpdate.isEdit = false;
      productToUpdate.isEdit=!productToUpdate.isEdit
      productToUpdatee.isEdit = false;
      productToUpdatee.isEdit=!productToUpdate.isEdit
    },
    filter: (state, action) => {
      const p = state.products;
      if (!state.isSort) {
        console.log(state.products);
        state.products = [...state.products].sort((a, b) => a.price - b.price);
        console.log(state.products);
        state.isSort = !state.isSort;
      } else {
        state.products = [...state.originalproducts];
        state.isSort = !state.isSort;
        console.log(state.originalproducts);
      }
    },
    toggleEdit:(state,action)=>{
      state.products[action.payload].isEdit = !state.products[action.payload].isEdit;
      // state.originalproducts[action.payload].isEdit
    }
  },
});

export const homeReducer = homeSlice.reducer;
export const actions = homeSlice.actions;
export const homeSelector = (state) => state.homeReducer;
