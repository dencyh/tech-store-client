import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import type { PayloadAction, EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { apiSlice } from "../api/apiSlice";
import { toast } from "react-toastify";
import { Product } from "../../types/products/core.product";

export interface ClientCartItem {
  product: string;
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
  selectId: (product) => product.product
});

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cartItem) => cartItem.product._id
});

const localCart = JSON.parse(
  localStorage.getItem("bts_cart") || "false"
) as EntityState<ClientCartItem>;

const initialLocalState = localCart || localCartAdapter.getInitialState();
const initialState = cartAdapter.getInitialState();

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
      { userId: string; products: CartItem[] }
    >({
      query: ({ userId, products }) => ({
        url: `/cart/${userId}`,
        method: "PUT",
        body: {
          products: products.map((cartItem) => ({
            product: cartItem.product._id,
            quantity: cartItem.quantity
          }))
        },
        credentials: "include"
      }),
      async onQueryStarted({ userId, products }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", userId, (draft) => {
            return cartAdapter.setAll(initialState, products);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          toast.error("Не удалось обновить корзину. Попробуйте позже");
          patchResult.undo();
        }
      }
    })
  })
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialLocalState,
  reducers: {
    productIncrement(state, action: PayloadAction<ClientCartItem>) {
      const { product: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (!!isAdded) {
        isAdded.quantity = isAdded.quantity + quantity;
      } else {
        localCartAdapter.addOne(state, action.payload);
      }
      localStorage.setItem("bts_cart", JSON.stringify({ ...state }));
    },
    productDecrement(state, action: PayloadAction<ClientCartItem>) {
      const { product: productId, quantity } = action.payload;
      const isAdded = state.entities[productId];

      if (isAdded?.quantity === 1) {
        localCartAdapter.removeOne(state, isAdded.product);
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

export const selectCartResult = (userId: string) =>
  cartApiSlice.endpoints.getCart.select(userId);

export const selectCart = (userId: string) =>
  createSelector(
    selectCartResult(userId),
    (cartResult) => cartResult.data ?? null
  );

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useGetProductsByIdsQuery
} = cartApiSlice;

const currentUser = null;

export const getCartSelectors = (userId?: string) => {
  const selectCartResult = cartApiSlice.endpoints.getCart.select(userId || "");

  const selectCart = createSelector(selectCartResult, (result) => result.data);
  const { selectAll: selectAllCart } = cartAdapter.getSelectors(
    (state: RootState) => selectCart(state) ?? initialState
  );

  return {
    selectAllCart,
    selectCart
  };
};
