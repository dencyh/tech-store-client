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
    toggleFilters(state, action: PayloadAction<FiltersParams>) {
      const newFilter = action.payload;
      const [[key, value]] = Object.entries(newFilter);
      if (typeof value !== "string") return;

      const currentArr = state.filters[key];

      if (key === "price") {
        const arr = value.split(",");
        state.filters[key] = arr;
        return;
      }

      if (!currentArr) {
        state.filters[key] = [value];
      } else {
        if (!Array.isArray(currentArr)) return;
        const isAdded = currentArr.find((filter) => filter === value);

        if (isAdded) {
          state.filters[key] = currentArr.filter((filter) => filter !== value);

          if (state.filters[key].length === 0) {
            delete state.filters[key];
          }
        } else {
          state.filters[key] = [...currentArr, value];
        }
      }
    }
  }
});

export const { setFilters, toggleFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
