import { ProductInCart } from "../features/cart/cartSlice";
import { Product } from "./products/core.product";

export interface Cart {
  userId: string;
  productsInCart: ProductInCart[];
}
