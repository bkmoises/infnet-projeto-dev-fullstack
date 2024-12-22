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

interface Pagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

interface CarState {
  cars: Car[];
  car: Car;
  pagination: Pagination;
}

const initialState: CarState = {
  cars: [],
  car: {},
  pagination: {
    page: 0,
    size: 10,
    totalItems: 0,
    totalPages: 0,
  },
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    appendCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = [...state.cars, ...action.payload];
    },
    setCar: (state, action: PayloadAction<Car>) => {
      state.car = action.payload;
    },
    resetCar: (state) => {
      state.car = {};
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
  },
});

export const { setCars, appendCars, setCar, resetCar, setPagination } = carSlice.actions;

export default carSlice.reducer;
