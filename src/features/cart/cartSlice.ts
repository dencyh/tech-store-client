import { TEST_USER_ID } from "./../api/apiSlice";
import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { apiSlice } from "../api/apiSlice";
import { toast } from "react-toastify";
import { Product } from "../../types/products/core.product";

export interface ProductInCart {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  productsInCart: ProductInCart[];
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, { userId: string }>({
      query: ({ userId }) => ({
        url: `/cart/${userId}`,
        credentials: "include"
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
        body: { productsInCart },
        credentials: "include"
      }),
      async onQueryStarted(
        { userId, productsInCart },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getCart",
            { userId },
            (draft) => {
              draft.productsInCart = productsInCart;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          toast.error("Не удалось обновить корзину. Попробуйте позже");
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"]
    }),
    getCartProducts: builder.query<
      {
        userId: string;
        productsInCart: { quantity: number; productId: Product }[];
      },
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/cart/${userId}`,
        method: "POST",
        credentials: "include"
      }),
      providesTags: ["Cart"]
    })
  })
});

const cartAdapter = createEntityAdapter<ProductInCart>({
  selectId: (product) => product.productId
});

const initialState = cartAdapter.getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productIncrement(state, action: PayloadAction<ProductInCart>) {
      const { productId: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (!!isAdded) {
        isAdded.quantity = isAdded.quantity + quantity;
      } else {
        cartAdapter.addOne(state, action.payload);
      }
    },
    productDecrement(state, action: PayloadAction<ProductInCart>) {
      const { productId: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (isAdded?.quantity === 1) {
        cartAdapter.removeOne(state, isAdded.productId);
      } else if (!!isAdded) {
        isAdded.quantity -= 1;
      }
    }
  }
});

export const { productIncrement, productDecrement } = cartSlice.actions;

export default cartSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds
} = cartAdapter.getSelectors((state: RootState) => state.cart);

export const selectCartQuantity = createSelector(
  [selectAllProducts],
  (products) => products.reduce((acc, product) => acc + product.quantity, 0)
);

export const {
  useGetCartQuery,
  useGetCartProductsQuery,
  useUpdateCartMutation
} = extendedApiSlice;

const selectCartResult = extendedApiSlice.endpoints.getCart.select({
  userId: TEST_USER_ID
});

const emptyCart = {};

export const selectCart = createSelector(
  selectCartResult,
  (cartResult) => cartResult?.data ?? emptyCart
);
