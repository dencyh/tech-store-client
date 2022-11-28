import { createSlice } from "@reduxjs/toolkit";

interface ProductInCart {
  id: string;
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
  reducers: {}
});

export default cartSlice.reducer;
