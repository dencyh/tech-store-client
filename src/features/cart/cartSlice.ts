import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export interface ProductInCart {
  productId: string;
  quantity: number;
}

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
