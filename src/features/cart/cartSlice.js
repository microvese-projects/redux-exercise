import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((each) => {
        return each.id !== id;
      })
    },
    increase: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          item.amount += 1;
        }
        return item;
      })
    },
    decrease: (state, action) => {
      const id = action.payload;
      console.log("called with: ", id);
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          item.amount > 0 ? item.amount -= 1 : item.amount = 0;
        }
        return item;
      })
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += (item.amount * item.price);
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.pending]: (state) => {
      state.isLoading = false;
    }
  }
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;