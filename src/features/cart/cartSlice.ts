import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface ProductInCart {
  _id: string;
  quantity: number;
}

interface CartState {
  products: ProductInCart[];
}

const initialState: CartState = {
  products: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productIncrement(state, action: PayloadAction<ProductInCart>) {
      const isAdded = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isAdded) {
        isAdded.quantity = isAdded.quantity ? isAdded.quantity + 1 : 0;
      } else {
        state.products.push(action.payload);
      }
    }
  }
});

export const { productIncrement } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartQuantity = (state: RootState) =>
  state.cart.products.reduce((acc, product) => acc + product.quantity, 0);
