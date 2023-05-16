import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-projects';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
  try {
    const resp = await axios(url)
    return resp.data;
  } catch(error) {
    return thunkAPI.rejectWithValue('something went wrong')
  }
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
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    }
  }
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;