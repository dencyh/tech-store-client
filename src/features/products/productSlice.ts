import { RootState } from "./../../redux/store";
import {
  createEntityAdapter,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
import { Product } from "../../types/products/core.product";
import { apiSlice } from "../api/apiSlice";
import type { EntityState } from "@reduxjs/toolkit";
import { FiltersParams } from "../filters/filtersSlice";
import { useSearchParams } from "react-router-dom";

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
        let params = new URLSearchParams();
        if (typeof filters === "object" && Object.keys(filters).length > 0) {
          for (const key in filters) {
            const value = filters[key];
            params.set(key, JSON.stringify(value));
          }
        }

        return `/products?${params.toString()}`;
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

export const getProductsSelectors = (filters?: FiltersParams) => {
  const selectProductsResult = filters
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductConfig: (state, action) => {
      console.log("click");
    }
  }
});

export const { setProductConfig } = productsSlice.actions;

export default productsSlice.reducer;
