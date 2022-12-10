import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { Product } from "../../types/products/core.product";

export interface FiltersParams {
  [key: string]: string | string[];
}

export type SpecsVariety<T, S> = {
  [key in keyof T]: T[key] extends S
    ? { [key in keyof S]: S[key][] }
    : T[key][];
};

export type SpecsVariants = Omit<
  SpecsVariety<Product, Product["specs"]>,
  "description" | "imagePaths" | "brand" | "category" | "type"
>;

const filtersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpecs: builder.query<SpecsVariants, string>({
      query: (type) => ({
        url: `/specs/${type}`
      })
    })
  })
});

export const { useGetSpecsQuery } = filtersApiSlice;

const initialState = {
  filters: {} as FiltersParams,
  complexFilters: {} as FiltersParams
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FiltersParams>) {
      state.filters = action.payload;
    },
    addFilters(state, action: PayloadAction<FiltersParams>) {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { setFilters, addFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
