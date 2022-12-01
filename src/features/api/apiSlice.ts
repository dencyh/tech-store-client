import { ProductInCart } from "./../cart/cartSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { method } from "lodash";
import { Category } from "../../types/category";
import { Product } from "../../types/products/core.product";
import { Cart } from "../../types/cart";
import { Bookmarks } from "../../types/bookmarks";

export const TEST_USER_ID = "6388acc029fb5aa7d36d6b5e";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api"
  }),
  tagTypes: ["Category", "Product", "Cart", "Bookmarks"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories"
    }),
    getCategoryProducts: builder.query<Product[], string>({
      query: (category) => `/products?type=${category}`
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
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetProductQuery,
  useUploadImagesMutation
} = apiSlice;
