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
import type { EntityState } from "@reduxjs/toolkit";

export interface ClientCartItem {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ClientCart {
  userId: string;
  productsInCart: ClientCartItem[];
}

const localCartAdapter = createEntityAdapter<ClientCartItem>({
  selectId: (product) => product.productId
});

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cartItem) => cartItem.product._id
});

const localCart = JSON.parse(
  localStorage.getItem("bts_cart") || "false"
) as EntityState<ClientCartItem>;

const initialState = localCart || localCartAdapter.getInitialState();

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<EntityState<CartItem>, string>({
      query: (userId) => ({
        url: `/cart/${userId}`,
        credentials: "include"
      }),
      transformResponse: (response: CartItem[]) => {
        const initialState = cartAdapter.getInitialState();
        return cartAdapter.setAll(initialState, response);
      },
      providesTags: ["Cart"]
    }),
    getProductsByIds: builder.query<Product[], string[]>({
      query: (cart) => ({
        url: `/products/cart`,
        method: "POST",
        body: cart
      })
    }),
    updateCart: builder.mutation<
      ClientCart,
      { userId: string; productsInCart: ClientCartItem[] }
    >({
      query: ({ userId, productsInCart }) => ({
        url: `/cart/${userId}`,
        method: "PUT",
        body: { productsInCart },
        credentials: "include"
      }),
      // async onQueryStarted(
      //   { userId, productsInCart },
      //   { dispatch, queryFulfilled }
      // ) {
      //   const patchResult = dispatch(
      //     cartApiSlice.util.updateQueryData("getCart", { userId }, (draft) => {
      //       draft.productsInCart = productsInCart;
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     toast.error("Не удалось обновить корзину. Попробуйте позже");
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: ["Cart"]
    })
    // getCartProducts: builder.query<any, { userId: string }>({
    //   query: ({ userId }) => ({
    //     url: `/cart/${userId}`,
    //     method: "POST",
    //     credentials: "include"
    //   }),
    //   transformResponse: (response: CartItem[]) => {
    //     const initialState = cartAdapter.getInitialState();
    //     return cartAdapter.setAll(initialState, response);
    //   },
    //   providesTags: ["Cart"]
    // })
  })
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productIncrement(state, action: PayloadAction<ClientCartItem>) {
      const { productId: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (!!isAdded) {
        isAdded.quantity = isAdded.quantity + quantity;
      } else {
        localCartAdapter.addOne(state, action.payload);
      }
      localStorage.setItem("bts_cart", JSON.stringify({ ...state }));
    },
    productDecrement(state, action: PayloadAction<ClientCartItem>) {
      const { productId: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (isAdded?.quantity === 1) {
        localCartAdapter.removeOne(state, isAdded.productId);
      } else if (!!isAdded) {
        isAdded.quantity -= 1;
      }
      localStorage.setItem("bts_cart", JSON.stringify({ ...state }));
    }
  }
});

export const { productIncrement, productDecrement } = cartSlice.actions;

export default cartSlice.reducer;

export const selectLocalCart = (state: RootState) => state.cart;
export const selectLocalCartQuantity = (state: RootState) =>
  Object.values(state.cart.entities).reduce(
    (acc, product) => acc + (product?.quantity || 0),
    0
  );

// export const {
//   selectAll: selectAllProducts,
//   selectById: selectProductById,
//   selectIds: selectProductIds
// } = cartAdapter.getSelectors((state: RootState) => state.cart);

// export const selectCartQuantity = createSelector(
//   selectAllProducts,
//   (products) => products.reduce((acc, product) => acc + product.quantity, 0)
// );

export const selectCartResult = (userId: string) =>
  cartApiSlice.endpoints.getCart.select(userId);

export const selectCart = (userId: string) =>
  createSelector(
    selectCartResult(userId),
    (cartResult) => cartResult.data ?? null
  );

// export const selectCartQuantity = (userId: string) =>
//   createSelector(selectCartResult(userId), (cartItems) =>
//     cartItems.data?.productsInCart.reduce(
//       (acc, product) => acc + product.quantity,
//       0
//     )
//   );

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useGetProductsByIdsQuery
} = cartApiSlice;
