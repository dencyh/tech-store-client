import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api"
  }),
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories"
    }),
    getCategoryProducts: builder.query({
      query: (category) => `/products?type=${category}`
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetProductQuery
} = apiSlice;
