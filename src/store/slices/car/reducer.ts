import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Car {
  id?: string;
  fabricante?: string;
  modelo?: string;
  ano?: number;
  cor?: string;
  potencia?: string;
  pais?: string;
}

interface CarState {
  cars: Car[];
  car: Car;
}

const initialState: CarState = {
  cars: [],
  car: {},
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    setCar: (state, action: PayloadAction<Car>) => {
      state.car = action.payload;
    },
    resetCar: (state) => {
      state.car = {};
    },
  },
});

export const { setCars, setCar, resetCar } = carSlice.actions;

export default carSlice.reducer;
