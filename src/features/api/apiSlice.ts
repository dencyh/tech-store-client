import { ProductInCart } from "./../cart/cartSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { method } from "lodash";
import { Category } from "../../types/category";
import { Product } from "../../types/products/core.product";
import { Cart } from "../../types/cart";
import { toast } from "react-toastify";

export const TEST_USER_ID = "638616786d4b8695193f2c41";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/api"
  }),
  tagTypes: ["Category", "Product", "Cart"],
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
    }),
    getCart: builder.query<Cart, { userId: string }>({
      query: ({ userId }) => `/cart/${userId}`,
      providesTags: ["Cart"]
    }),
    getCartProducts: builder.query<
      Product[],
      { userId: string; ids: string[] }
    >({
      query: ({ userId, ids }) => ({
        url: `/cart/${userId}/products`,
        method: "POST",
        body: { ids }
      }),
      providesTags: ["Cart"]
    }),
    updateCart: builder.mutation<
      Cart,
      { userId: string; productsInCart: ProductInCart[] }
    >({
      query: ({ userId, productsInCart }) => ({
        url: `/cart/${userId}`,
        method: "PUT",
        body: { productsInCart }
      }),
      async onQueryStarted(
        { userId, productsInCart },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getCart", { userId }, (draft) => {
            draft.productsInCart = productsInCart;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          toast.error("Не удалось обновить корзину. Попробуйте позже");
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetProductQuery,
  useUploadImagesMutation,
  useGetCartQuery,
  useGetCartProductsQuery,
  useUpdateCartMutation
} = apiSlice;
