import { ProductInCart } from "../features/cart/cartSlice";

export interface Cart {
  userId: string;
  productsInCart: ProductInCart[];
}
