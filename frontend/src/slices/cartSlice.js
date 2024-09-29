import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Razorpay' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Ensure cartItems is an array (if for some reason it's undefined)
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        // Replace the existing item with the updated one
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        // Add new item to the cart
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state); // Persist the cart changes (e.g., to localStorage)
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      // Ensure cartItems is an array
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }

      // Filter out the item by its ID
      state.cartItems = state.cartItems.filter(x => x._id !== id);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
