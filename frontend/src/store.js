// Import necessary functions and slices from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
import searchProductSliceReducer from './slices/searchProductSlice';

// Configure the Redux store
const store = configureStore({
  // Combine reducers for different slices
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // API-related state reducer
    cart: cartSliceReducer, // Shopping cart state reducer
    auth: authSliceReducer, // Authentication state reducer
    search: searchProductSliceReducer, // Product search state reducer
  },

  // Add middleware to the Redux store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check if needed
    }).concat(apiSlice.middleware), // Add API middleware
});
// Export the configured Redux store for use in the application
export default store;
