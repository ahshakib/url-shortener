import { configureStore } from '@reduxjs/toolkit';
import urlReducer from '../features/urlSlice';

export const store = configureStore({
  reducer: {
    url: urlReducer,
  },
});
