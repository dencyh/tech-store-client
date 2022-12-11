import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { Product } from "../../types/products/core.product";
import { isEqual } from "lodash";

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
  filters: {} as FiltersParams
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
      const [[key, jsonValue]] = Object.entries(newFilter);

      if (typeof jsonValue !== "string") return;
      const value = JSON.parse(jsonValue);

      if (key === "price") {
        state.filters[key] = value;
        return;
      }

      const currentArr = state.filters[key];
      if (!currentArr) {
        state.filters[key] = [value];
      } else {
        if (!Array.isArray(currentArr)) return;
        const isAdded = currentArr.find((filter) => isEqual(filter, value));

        if (isAdded) {
          state.filters[key] = currentArr.filter(
            (filter) => !isEqual(filter, value)
          );

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
