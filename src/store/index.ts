import { configureStore } from "@reduxjs/toolkit";
import carReducer from './slices/car/reducer';
import { RootState } from './types';

export const store = configureStore({
  reducer: {
    car: carReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;