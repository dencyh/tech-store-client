import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { method } from "lodash";
import { Product } from "../../types/products/core.product";

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
    }),
    uploadImages: builder.mutation<Product, { id: string; images: FormData }>({
      query: ({ id, images }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        // headers: {
        //   "content-type": "multipart/form-data"
        // },
        body: images
      })
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetProductQuery,
  useUploadImagesMutation
} = apiSlice;
