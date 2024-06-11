// 3° Passo - aqui está sendo criado o store

import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;

// o 4° Passo está no main.jsx
