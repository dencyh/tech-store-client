import { RootState } from "./../../redux/store";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../types/products/core.product";
import { apiSlice } from "../api/apiSlice";
import type { EntityState } from "@reduxjs/toolkit";
import { FiltersParams } from "../filters/filtersSlice";

export const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id
});

export const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryProducts: builder.query<
      EntityState<Product>,
      FiltersParams | void
    >({
      query: (filters) => {
        console.log(filters);
        const query = filters
          ? "" +
            Object.keys(filters)
              .map((key) => {
                if (!filters[key]) return "";
                const value = filters[key];
                if (typeof value === "string") {
                  return `${key}=${value.replaceAll(" ", "%20")}`;
                }
                return `${key}=${value.join("%2C").replaceAll(" ", "%20")}`;
              })
              .join("&")
              .replace(/\&$/, "")
          : "";
        console.log(query);
        return `/products?${query}`;
      },
      transformResponse: (response: Product[]) => {
        return productsAdapter.setAll(initialState, response);
      },
      providesTags: ["Product"]
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`
    }),
    uploadImages: builder.mutation<Product, { id: string; images: FormData }>({
      query: ({ id, images }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: images
      })
    })
  })
});

export const {
  useGetCategoryProductsQuery,
  useGetProductQuery,
  useUploadImagesMutation
} = productsApiSlice;

export const getProductsSelectors = (filters: FiltersParams) => {
  const selectProductsResult =
    Object.keys(filters).length > 0
      ? productsApiSlice.endpoints.getCategoryProducts.select(filters)
      : productsApiSlice.endpoints.getCategoryProducts.select();

  const selectProductsData = createSelector(
    selectProductsResult,
    (result) => result.data
  );
  const { selectAll: selectAllProducts, selectById: selectProductById } =
    productsAdapter.getSelectors(
      (state: RootState) => selectProductsData(state) ?? initialState
    );

  return {
    selectAllProducts,
    selectProductById
  };
};
