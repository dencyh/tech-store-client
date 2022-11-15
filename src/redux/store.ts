import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesState";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
