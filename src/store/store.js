import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import testSlice from './testSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    test: testSlice,
  },
});

export default store;